import React, { FunctionComponent } from "react"

import styles from "./Home.module.scss"
import { Typography } from "@material-ui/core"
import Content from "@Components/Content"
import NewsGrid from "@Components/NewsGrid"
import useSiteMeta from "@Hooks/useSiteMeta"
import Article from "types/Article"
import { Helmet } from "react-helmet"

export interface HomeProps {
  data: {
    allWordpressPost: {
      edges: {
        node: Article
      }[]
    }
  }
}

const Home: FunctionComponent<HomeProps> = props => {
  const { schoolType, schoolName } = useSiteMeta()
  const news = props.data.allWordpressPost.edges.map(p => p.node)

  return (
    <>
      <Helmet>
        <title>
          {schoolType} "{schoolName}"
        </title>
      </Helmet>
      <div>
        <div className={styles.heroImage}>
          <div className={styles.heroTitle}>
            <Typography variant="h1" className={styles.heroTitleFirst}>
              {schoolType}
            </Typography>
            <Typography variant="h1">"{schoolName}"</Typography>
          </div>
        </div>
        <Content>
          <NewsGrid news={news} />
        </Content>
      </div>
    </>
  )
}

export default Home
