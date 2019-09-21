import React from 'react'
import './Tile.scss'

type TileProps = {
  size: string
  thumbnail: string
  children: any
}

const Tile: React.FC<TileProps> = ({ size, thumbnail, children }) => {
  return (
    <div className={`tile ${size}`} style={{ backgroundImage: `url(${thumbnail})` }}>
      {children}
    </div>
  )
}

export default Tile
