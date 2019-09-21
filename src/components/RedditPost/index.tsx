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

const RedditPost: FC<RedditPostProps> = ({
  title,
  createdUnix,
  url,
  numComments,
  permalink,
  subreddit
}) => {
  const getLink = () => (
    <Fragment>
      <a href={url} target="_blank" rel="noopener noreferrer">
        Link
      </a>
      <span>{' - '}</span>
    </Fragment>
  )

  const getSubredditLink = () => (
    <Fragment>
      <a href={`http://www.reddit.com/r/${subreddit}`} target="_blank" rel="noopener noreferrer">
        {`r/${subreddit}`}
      </a>
      <span>{' - '}</span>
    </Fragment>
  )

  const getTitle = () => {
    // adjust string trunc length based on tile size?
    return `${title.substring(0, 100)}${title.length > 100 ? '...' : ''}`
  }

  return (
    <div className="reddit-post">
      <h4 className="title">{getTitle()}</h4>
      {url !== `https://www.reddit.com${permalink}` && getLink()}
      {getSubredditLink()}
      <a href={`https://www.reddit.com${permalink}`} target="_blank" rel="noopener noreferrer">
        {`${numComments} comments`}
      </a>
      <div>{moment.unix(createdUnix).format('ddd M/D - h:mm a')}</div>
    </div>
  )
}

export default RedditPost
