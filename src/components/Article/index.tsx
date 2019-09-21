import React from 'react'
import './Article.scss'

type ArticleProps = {
  title: string
  date: any
  url: string
  ups: number
}

const Article: React.FC<ArticleProps> = ({ title, date, url, ups }) => {
  return (
    <div className="article">
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
      <div>{date.format('dddd, MMM D - h:m a')}</div>
    </div>
  )
}

export default Article
