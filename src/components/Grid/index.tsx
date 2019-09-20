import React from 'react'
import moment from 'moment'

import Tile from '../Tile'
import Article from '../Article'

import './Grid.scss'

type GridProps = {}

const Grid: React.FC<GridProps> = () => {
  return (
    <div className="grid">
      {[...Array(40)].map((tile, i) => (
        <Tile size={i % 2 === 0 ? 'small' : i % 3 === 0 ? 'medium' : 'large'} key={`tile-${i}`}>
          <Article title="title" date={moment()} />
        </Tile>
      ))}
      {[...Array(20)].map((tile, i) => (
        <Tile size="filler" key={`tile-filler-${i}`}>
          <Article title="title" date={moment()} />
        </Tile>
      ))}
    </div>
  )
}

export default Grid
