import React from 'react'
import './Article.scss'

type ArticleProps = {
  title: string
  date: any
}

const Article: React.FC<ArticleProps> = ({ title, date }) => {
  return (
    <div className="article">
      <div>{title}</div>
      <div>{date.format()}</div>
    </div>
  )
}

export default Article
