import React, { useState, useEffect } from 'react'
import moment from 'moment'
import get from 'lodash/get'

import Tile from '../Tile'
import Article from '../Article'

import './Grid.scss'

type GridProps = {}

const Grid: React.FC<GridProps> = () => {
  const [stories, setStories] = useState([])

  const setFeed = () => {
    fetch('https://www.reddit.com/.json')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const posts = get(data, 'data.children', [])
        const stories = posts.map((post: any) => ({
          title: get(post, 'data.title', ''),
          created: get(post, 'data.created', ''),
          url: get(post, 'data.url', ''),
          selfText: get(post, 'data.selfText', ''),
          thumbnail: get(post, 'data.thumbnail', ''),
          ups: get(post, 'data.ups', 0)
        }))
        setStories(stories)
      })
      .catch(err => console.log(err))
  }

  useEffect(setFeed, [])

  return (
    <div className="grid">
      {stories.map((story, i) => (
        <Tile
          size={i % 2 === 0 ? 'small' : i % 3 === 0 ? 'medium' : 'large'}
          key={`tile-${i}`}
          thumbnail={get(story, 'thumbnail')}
        >
          <Article
            title={get(story, 'title')}
            date={moment.unix(get(story, 'created'))}
            url={get(story, 'url')}
            ups={get(story, 'ups')}
          />
        </Tile>
      ))}
      {[...Array(20)].map((tile, i) => (
        <Tile size="filler" key={`tile-filler-${i}`} thumbnail="">
          <div />
        </Tile>
      ))}
    </div>
  )
}

export default Grid
