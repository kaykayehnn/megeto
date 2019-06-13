import React, { FunctionComponent } from "react"
import classnames from "classnames"

import styles from "./NewsCard.module.scss"
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
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
  excerpt: string
  imageUrl: string
  className: string
  path: string
}

const NewsCard: FunctionComponent<NewsCardProps> = ({
  title,
  date,
  avatarUrl,
  excerpt,
  imageUrl,
  className,
  path: pathname,
}) => {
  return (
    <Card className={classnames(styles.card, className)}>
      <CardHeader
        avatar={<Avatar src={avatarUrl} />}
        title={title}
        subheader={date}
        className={styles.header}
      />
      <CardMedia className={styles.image} image={imageUrl} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {excerpt}
        </Typography>
      </CardContent>
      <CardActions className={styles.actions}>
        <Button
          component={Link}
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
