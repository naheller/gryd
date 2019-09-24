import React, { FC, Fragment, useState, useEffect } from 'react'
import moment from 'moment'
import get from 'lodash/get'
import DOMPurify from 'dompurify'
import marked from 'marked'

import './RedditPost.scss'

export type RedditPostProps = {
  id: string
  title: string
  score: number
  url: string
  createdUnix: number
  permalink: string
  selfText: string
  subreddit: string
  thumbnail: string
  numComments: number
  isNsfw: boolean
}

export type CommentProps = {
  id: string
  body: string
  author: string
}

type BGImageStyle = {
  backgroundImage: string
}

const RedditPost: FC<RedditPostProps> = ({
  id,
  title,
  createdUnix,
  url,
  numComments,
  permalink,
  subreddit,
  thumbnail,
  score
}): JSX.Element => {
  const baseUrl: string = 'https://www.reddit.com'
  const bgImageStyle: BGImageStyle = { backgroundImage: `url(${thumbnail})` }
  const hasThumbnail: boolean = thumbnail !== 'self' && thumbnail !== 'default' && thumbnail !== ''
  const hasHighScore = score > 30000

  const [comments, setComments] = useState([])
  const [topComment, setTopComment] = useState({ body: '', author: '' })
  const [fetchState, setFetchState] = useState('NOT_STARTED')

  useEffect(() => {
    if (hasHighScore) fetchCommentsForPost(subreddit, id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (fetchState === 'SUCCESS') {
      const firstCommentAuthor: string = get(comments, '[0].author', '')
      const firstCommentBody: string = get(comments, '[0].body', '')

      const commentToDisplay: { body: string; author: string } =
        firstCommentAuthor.toLowerCase().includes('bot') ||
        firstCommentBody.toLowerCase().includes('bot')
          ? comments[1]
          : comments[0]

      setTopComment({ body: commentToDisplay.body, author: commentToDisplay.author })
    }
  }, [fetchState]) // eslint-disable-line react-hooks/exhaustive-deps

  const formatUnixDate = (unix: number): string => moment.unix(unix).format('ddd M/D - h:mm a')

  const addCommasToNumber = (number: number): string =>
    number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

  const fetchCommentsForPost = (subreddit: string = '', postId: string = ''): void => {
    setFetchState('LOADING')

    const subredditPrefixed = `r/${subreddit.trim().replace(/\s+/g, '')}`
    const url = `${baseUrl}/${subredditPrefixed}/comments/${postId}.json?limit=25`

    fetch(url)
      .then(res => res.json())
      .then(listing => {
        const comments = get(listing, '[1].data.children', [])
        const redditComments = comments.map((comment: object) => makeComment(comment))
        setComments(redditComments)
        setFetchState('SUCCESS')
      })
      .catch(err => {
        setFetchState('FAILURE')
        console.log(err)
      })
  }

  const makeComment = (post: object): CommentProps => {
    return {
      id: get(post, 'data.id', ''),
      body: DOMPurify.sanitize(get(post, 'data.body', '')),
      author: get(post, 'data.author', '')
    }
  }

  const renderComment = (): JSX.Element => (
    <div className="comment">
      <hr />
      <small className="author">
        <i>{`${topComment.author} commented:`}</i>
      </small>
      <div className="comment-body" dangerouslySetInnerHTML={{ __html: marked(topComment.body) }} />
    </div>
  )

  const renderLink = (): JSX.Element => {
    const fontColor = hasThumbnail ? 'lightgreen' : 'green'

    return (
      <a className={`title ${fontColor}`} href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    )
  }

  const renderTitle = (): JSX.Element => {
    return hasHighScore ? (
      <h2 className="title">{renderLink()}</h2>
    ) : (
      <h4 className="title">{renderLink()}</h4>
    )
  }

  const renderSubredditLink = (): JSX.Element => (
    <Fragment>
      <b>
        <a href={`${baseUrl}/r/${subreddit}`} target="_blank" rel="noopener noreferrer">
          {`r/${subreddit}`}
        </a>
      </b>
      <span>{' - '}</span>
    </Fragment>
  )

  const renderHeader = (): JSX.Element => (
    <div className="header" style={hasThumbnail ? bgImageStyle : {}}>
      <div className="title-container">{renderTitle()}</div>
    </div>
  )

  const renderBody = (): JSX.Element => {
    const roundAllCorners = !hasThumbnail ? 'round-all-corners' : ''

    // TODO: Use momentjs to further format date
    return (
      <div className={`body ${roundAllCorners}`}>
        {!hasThumbnail && <div className="title-container">{renderTitle()}</div>}
        {!hasThumbnail && <hr />}
        {renderSubredditLink()}
        <a href={`${baseUrl}${permalink}`} target="_blank" rel="noopener noreferrer">
          {`${addCommasToNumber(numComments)} comments`}
        </a>
        <div>{`${addCommasToNumber(score)} pts - ${formatUnixDate(createdUnix)}`}</div>
        {fetchState === 'SUCCESS' && renderComment()}
      </div>
    )
  }

  return (
    <div className="reddit-post">
      {hasThumbnail && renderHeader()}
      {renderBody()}
    </div>
  )
}

export default RedditPost
