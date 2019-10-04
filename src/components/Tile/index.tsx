import React, { useState, useEffect, useRef, cloneElement } from 'react'
import './Tile.scss'

type TileProps = {
  key?: string
  size?: string
  children?: any
  isSearch?: boolean
}

const Tile: React.FC<TileProps> = ({ size, isSearch, children }): JSX.Element => {
  const [tileSize, setTileSize] = useState(size)
  const newChildren = cloneElement(children, { expanded: tileSize === 'large' })
  const tileRef = useRef(null);

  useEffect(() => {
    if (tileSize === 'large' && size !== 'large') {
      scrollToTile(tileRef)
    }
  }, [tileSize]) // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToTile = (tileRef: any): void => {
    window.scrollTo({
      top: tileRef.current.offsetTop, 
      left: 0, 
      behavior: 'smooth'
    })
  }

  const renderExpandButton = () => {
    if (tileSize !== 'large' && !isSearch) {
      return (
        <button onClick={() => setTileSize('large')}>
          Expand
        </button>
      )
    }
  }

  return (
    <div ref={tileRef} className={`tile ${tileSize}`}>
      <div className="content">
        {newChildren}
      </div>
      <div className="controls">
        {renderExpandButton()}
      </div>
    </div>
  )
}

export default Tile
