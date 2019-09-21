import React from 'react'
import './Tile.scss'

type TileProps = {
  key?: string
  size?: string
  thumbnail?: string
  children?: any
}

type BGImageStyle = {
  backgroundImage: string
}

type BGColorStyle = {
  backgroundColor: string
}

const Tile: React.FC<TileProps> = ({ size, thumbnail, children }) => {
  const bgImageStyle: BGImageStyle = { backgroundImage: `url(${thumbnail})` }
  const bgColorStyle: BGColorStyle = { backgroundColor: '#f1f1f1' }
  const hasThumbnail = thumbnail !== 'self' && thumbnail !== ''

  return (
    <div className={`tile ${size}`}>
      <div className="header" style={hasThumbnail ? bgImageStyle : bgColorStyle} />
      <div className="body">{children}</div>
    </div>
  )
}

export default Tile
