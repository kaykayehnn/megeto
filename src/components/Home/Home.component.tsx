import React, { FunctionComponent } from "react"

import styles from "./Home.module.scss"
import { Typography } from "@material-ui/core"
import Content from "@Components/Content"
import NewsGrid from "@Components/NewsGrid"

export interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div>
      <div className={styles.heroImage}>
        <div className={styles.heroTitle}>
          <Typography variant="h1" className={styles.heroTitleFirst}>
            Математическа Гимназия
          </Typography>
          <Typography variant="h1">&quot;Академик Кирил Попов&quot;</Typography>
        </div>
      </div>
      <Content>
        <NewsGrid maxCount={3} />
      </Content>
    </div>
  )
}

export default Home
