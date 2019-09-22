import React from 'react'
import './Tile.scss'

type TileProps = {
  key?: string
  size?: string
  children?: any
}

const Tile: React.FC<TileProps> = ({ size, children }): JSX.Element => {
  return <div className={`tile ${size}`}>{children}</div>
}

export default Tile
