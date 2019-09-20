import React from 'react'
import './Tile.scss'

type TileProps = {
  children: any
  size: string
}

const Tile: React.FC<TileProps> = ({ size, children }) => {
  return <div className={`tile ${size}`}>{children}</div>
}

export default Tile
