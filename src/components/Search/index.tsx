import React, { useState, useEffect } from 'react'
import get from 'lodash/get'
import './Search.scss'

type SearchProps = {
  fetchRedditPosts: any
}

const Search: React.FC<SearchProps> = ({ fetchRedditPosts }): JSX.Element => {
  const [searchText, setSearchText] = useState('')
  const [fetchStatus, setFetchStatus] = useState('NOT_STARTED')
  const [trendingSubreddits, setTrendingSubreddits] = useState([])
  const baseUrl: string = 'https://www.reddit.com'

  useEffect(() => {
    fetchTrendingSubreddits()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchTrendingSubreddits = (): void => {
    setFetchStatus('LOADING')
    const url: string = `${baseUrl}/api/trending_subreddits/.json`

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const subreddits: [] = get(data, 'subreddit_names', [])
        setTrendingSubreddits(subreddits)
        setFetchStatus('SUCCESS')
      })
      .catch(err => {
        setFetchStatus('FAILURE')
        console.log(err)
      })
  }

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

  const fillSearchFieldAndSearch = (name: string) => {
    setSearchText(name)
    fetchRedditPosts(name)
  }

  const makeButtonFromSubredditName = (name: string, i: number): JSX.Element => {
    return (
      <button key={`trending-subreddit-${i}`} onClick={() => fillSearchFieldAndSearch(name)}>
        {name}
      </button>
    )
  }

  const renderTrendingSubredditButtons = () =>
    trendingSubreddits.map((subredditName, i) => makeButtonFromSubredditName(subredditName, i))

  return (
    <div className="search">
      <input
        type="text"
        className="text-field"
        value={searchText}
        onChange={handleTextChange}
        placeholder="Enter subreddit"
      />
      <button onClick={search}>Get posts</button>
      <button onClick={resetSearch}>Reset</button>
      <hr />
      <p className="trending-title">Trending subreddits:</p>
      <div className="trending-container">
        {fetchStatus === 'SUCCESS' && renderTrendingSubredditButtons()}
      </div>
    </div>
  )
}

export default Search
