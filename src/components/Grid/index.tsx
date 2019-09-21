import React, { useState, useEffect, Fragment } from 'react'
import get from 'lodash/get'

import Tile from '../Tile'
import RedditPost, { RedditPostProps } from '../RedditPost'

import './Grid.scss'

type GridProps = {}

const Grid: React.FC<GridProps> = () => {
  const [redditPosts, setRedditPosts] = useState([])
  const [fetchState, setFetchState] = useState('NOT_STARTED')

  const fetchRedditPosts = () => {
    setFetchState('LOADING')

    fetch('https://www.reddit.com/.json')
      .then(res => res.json())
      .then(listing => {
        console.log(listing)
        const posts = get(listing, 'data.children', [])
        const redditPosts = posts.map((post: any) => makeRedditPost(post))

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

  const renderTiles = () => (
    <Fragment>
      {redditPosts.map((postProps: RedditPostProps, i: number) => (
        <Tile
          key={`tile-${i}`}
          thumbnail={get(postProps, 'thumbnail')}
          size={i % 2 === 0 ? 'small' : i % 3 === 0 ? 'medium' : 'large'}
        >
          <RedditPost {...postProps} />
        </Tile>
      ))}
      {[...Array(10)].map((_, i: number) => (
        <Tile size="filler" key={`tile-filler-${i}`} />
      ))}
    </Fragment>
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchRedditPosts(), [])

  return <div className="grid">{fetchState === 'SUCCESS' ? renderTiles() : <h3>Loading</h3>}</div>
}

export default Grid
