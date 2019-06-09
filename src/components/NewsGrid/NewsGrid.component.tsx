import React, { FunctionComponent } from "react"
import { Typography } from "@material-ui/core"

import styles from "./NewsGrid.module.scss"
import NewsCard from "@Components/NewsCard"

// TODO:
const NEWS = [
  {
    title: "Shrimp and Chorizo Paella",
    summary: `This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.`,
    avatarUrl: "/images/vasil_simeonov_compressed.jpg",
    imageUrl: "/images/building_2.png",
    pathname: "/news/1",
  },
  {
    title: "11ж отказват да купуват рози",
    summary: `This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.`,
    avatarUrl: "/images/vasil_simeonov_compressed.jpg",
    imageUrl: "/images/building_2.png",
    pathname: "/news/3",
  },
  {
    title: "ПЛАН 3A ПРИЕМ НА УЧЕНИЦИТЕ В V КЛАС 2019/2020 ГОДИНА",
    summary: `This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.`,
    avatarUrl: "/images/vasil_simeonov_compressed.jpg",
    imageUrl: "/images/building_2.png",
    pathname: "/news/2",
  },
]

NEWS.splice(0, 0, ...NEWS)

export interface NewsProps {
  maxCount?: number
}

const NewsGrid: FunctionComponent<NewsProps> = ({ maxCount = Infinity }) => {
  return (
    <div>
      <Typography variant="h1" className={styles.newsTitle}>
        Новини
      </Typography>
      <div className={styles.news}>
        {/* The index is the only reliable key in this case */}
        {NEWS.slice(0, maxCount).map((n, i) => (
          <NewsCard key={i} {...n} className={styles.card} />
        ))}
        {/* TODO: add pagination */}
      </div>
    </div>
  )
}

export default NewsGrid
