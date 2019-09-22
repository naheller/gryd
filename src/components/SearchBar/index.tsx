import React, { useState } from 'react'
import './SearchBar.scss'

type SearchBarProps = {
  fetchRedditPosts: any
}

const SearchBar: React.FC<SearchBarProps> = ({ fetchRedditPosts }): JSX.Element => {
  const [searchText, setSearchText] = useState('')

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value)
  }

  const search = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    fetchRedditPosts(searchText)
  }

  const resetSearch = (): void => {
    setSearchText('')
    fetchRedditPosts('')
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchText}
        onChange={handleTextChange}
        placeholder="Enter subreddit name"
      />
      <button onClick={search}>Get posts</button>
      <button onClick={resetSearch}>Reset</button>
    </div>
  )
}

export default SearchBar
