import React, { FunctionComponent } from "react"
import { Typography } from "@material-ui/core"

import styles from "./NewsGrid.module.scss"
import NewsCard from "@Components/NewsCard"
import Article from "types/Article"

export interface NewsProps {
  news: Article[]
}

const NewsGrid: FunctionComponent<NewsProps> = ({ news }) => {
  return (
    <div>
      <Typography variant="h1" className={styles.newsTitle}>
        Новини
      </Typography>
      <div className={styles.news}>
        {/* The index is the only reliable key in this case */}
        {news.map((n, i) => (
          <NewsCard
            key={i}
            title={n.title}
            date={n.date}
            excerpt={n.excerpt}
            path={n.path}
            imageUrl={n.featured_media.source_url}
            imageAlt={n.featured_media.alt_text}
            avatarUrl={n.author.avatar_urls.wordpress_96}
            avatarAlt={n.author.name}
            className={styles.card}
          />
        ))}
        {/* TODO: add pagination */}
      </div>
    </div>
  )
}

export default NewsGrid
