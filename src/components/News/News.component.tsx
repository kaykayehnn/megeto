import React, { FunctionComponent } from "react"

import styles from "./News.module.scss"
import Content from "@Components/Content"
import NewsGrid from "@Components/NewsGrid"
import Article from "types/Article"

export interface NewsProps {
  data: {
    allWordpressPost: {
      edges: {
        node: Article
      }[]
    }
  }
}

const News: FunctionComponent<NewsProps> = props => {
  const news = props.data.allWordpressPost.edges.map(p => p.node)

  return (
    <Content>
      <NewsGrid news={news} />
    </Content>
  )
}

export default News
