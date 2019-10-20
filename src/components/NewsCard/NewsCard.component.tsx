import React, { FunctionComponent } from "react"
import classnames from "classnames"

import styles from "./NewsCard.module.scss"
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core"
import { Link } from "gatsby"

import ChevronRightIcon from "@material-ui/icons/ChevronRight"

export interface NewsCardProps {
  title: string
  date: string
  avatarUrl: string
  avatarAlt: string
  excerpt: string
  imageUrl: string
  imageAlt: string
  className: string
  path: string
}

const NewsCard: FunctionComponent<NewsCardProps> = ({
  title,
  date,
  avatarUrl,
  avatarAlt,
  excerpt,
  imageUrl,
  imageAlt,
  className,
  path: pathname,
}) => {
  return (
    <Card component="article" className={classnames(styles.card, className)}>
      <CardHeader
        avatar={<Avatar src={avatarUrl} alt={avatarAlt} />}
        title={title}
        subheader={date}
        className={styles.header}
      />
      <div className={styles.cardContent}>
        <img className={styles.image} src={imageUrl} alt={imageAlt}></img>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {excerpt}
          </Typography>
        </CardContent>
      </div>
      <CardActions className={styles.actions}>
        <Button
          component={Link}
          role="link"
          to={pathname}
          className={styles.readMoreButton}
        >
          <ChevronRightIcon />
          Виж повече
        </Button>
      </CardActions>
    </Card>
  )
}

export default NewsCard
