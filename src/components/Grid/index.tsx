import React, { useState, useEffect, Fragment } from 'react'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

import Tile from '../Tile'
import SearchBar from '../SearchBar'
import RedditPost, { RedditPostProps } from '../RedditPost'

import './Grid.scss'

type GridProps = {}

const Grid: React.FC<GridProps> = () => {
  const [redditPosts, setRedditPosts]: any = useState([])
  const [fetchState, setFetchState]: any = useState('NOT_STARTED')
  const baseUrl: string = 'https://www.reddit.com'

  const fetchRedditPosts = (subreddit: string = ''): void => {
    setFetchState('LOADING')

    const formattedString = `r/${subreddit.trim().replace(/\s+/g, '')}`
    const searchTerm = isEmpty(subreddit) ? 'hot' : formattedString
    const url = `${baseUrl}/${searchTerm}/.json?limit=50`

    fetch(url)
      .then(res => res.json())
      .then(listing => {
        console.log(listing)
        const posts = get(listing, 'data.children', [])
        const redditPosts = posts.map((post: object) => makeRedditPost(post))

        setRedditPosts(redditPosts)
        setFetchState('SUCCESS')
      })
      .catch(err => {
        setFetchState('FAILURE')
        console.log(err)
      })
  }

  const makeRedditPost = (post: object): RedditPostProps => {
    return {
      title: get(post, 'data.title', ''),
      score: get(post, 'data.score', 0),
      url: get(post, 'data.url', ''),
      createdUnix: get(post, 'data.created', 0),
      permalink: get(post, 'data.permalink', ''),
      selfText: get(post, 'data.selfText', ''),
      subreddit: get(post, 'data.subreddit', ''),
      thumbnail: get(post, 'data.thumbnail', ''),
      numComments: get(post, 'data.num_comments', 0)
    }
  }

  const getTileSize = (hasThumbnail: boolean, hasHighScore: boolean): string => {
    if (hasThumbnail && hasHighScore) return 'large'
    if (hasThumbnail || hasHighScore) return 'medium'
    return 'small'
  }

  const renderTile = (postProps: RedditPostProps, index: number): JSX.Element => {
    const { thumbnail, score }: any = postProps
    const hasThumbnail: boolean =
      thumbnail !== 'self' && thumbnail !== 'default' && thumbnail !== ''

    const hasHighScore = score > 30000

    return (
      <Tile key={`tile-${index}`} size={getTileSize(hasThumbnail, hasHighScore)}>
        <RedditPost {...postProps} />
      </Tile>
    )
  }

  const renderSearchTile = (): JSX.Element => (
    <Tile size="filler">
      <SearchBar fetchRedditPosts={fetchRedditPosts} />
    </Tile>
  )

  const renderTiles = (): JSX.Element => (
    <Fragment>
      {redditPosts.map(
        (postProps: RedditPostProps, i: number): JSX.Element => renderTile(postProps, i)
      )}
      {/* {[...Array(redditPosts.length)].map((_, i: number) => (
        <Tile size="filler" key={`tile-filler-${i}`} />
      ))} */}
    </Fragment>
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchRedditPosts(), [])

  return (
    <div className="grid">
      {renderSearchTile()}
      {fetchState === 'SUCCESS' ? renderTiles() : <h3>Loading</h3>}
    </div>
  )
}

export default Grid
