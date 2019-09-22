import React, { FC, Fragment } from 'react'
import moment from 'moment'

import './RedditPost.scss'

export type RedditPostProps = {
  title: string
  score: number
  url: string
  createdUnix: number
  permalink: string
  selfText: string
  subreddit: string
  thumbnail: string
  numComments: number
}

type BGImageStyle = {
  backgroundImage: string
}

const RedditPost: FC<RedditPostProps> = ({
  title,
  createdUnix,
  url,
  numComments,
  permalink,
  subreddit,
  thumbnail,
  score
}): JSX.Element => {
  const bgImageStyle: BGImageStyle = { backgroundImage: `url(${thumbnail})` }
  const hasThumbnail: boolean = thumbnail !== 'self' && thumbnail !== 'default' && thumbnail !== ''
  const hasHighScore = score > 30000
  const baseUrl: string = 'https://www.reddit.com'

  const formatUnixDate = (unix: number): string => moment.unix(unix).format('ddd M/D - h:mm a')

  const renderHeader = (): JSX.Element => (
    <div className="header" style={hasThumbnail ? bgImageStyle : {}}>
      {renderTitle()}
    </div>
  )

  const renderBody = (): JSX.Element => {
    const roundAllCorners = !hasThumbnail ? 'round-all-corners' : ''

    // TODO: Use momentjs to further format date
    return (
      <div className={`body ${roundAllCorners}`}>
        {!hasThumbnail && renderTitle()}
        {!hasThumbnail && <hr />}
        {renderSubredditLink()}
        <a href={`${baseUrl}${permalink}`} target="_blank" rel="noopener noreferrer">
          {`${numComments.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} comments`}
        </a>
        <div>{`${score.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} pts - ${formatUnixDate(
          createdUnix
        )}`}</div>
      </div>
    )
  }

  const renderLink = (): JSX.Element => {
    const fontColor = hasThumbnail ? 'lightgreen' : 'green'

    return (
      <a
        className={`title ${fontColor}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >{`${title.substring(0, 100)}${title.length > 100 ? '...' : ''}`}</a>
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

  return (
    <div className="reddit-post">
      {hasThumbnail && renderHeader()}
      {renderBody()}
    </div>
  )
}

export default RedditPost
