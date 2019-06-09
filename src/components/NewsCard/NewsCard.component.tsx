import React, { FunctionComponent } from "react"

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
  avatarUrl: string
  summary: string
  imageUrl: string
  className: string
  pathname: string
}

const NewsCard: FunctionComponent<NewsCardProps> = ({
  title,
  avatarUrl,
  summary,
  imageUrl,
  className,
  pathname,
}) => {
  return (
    <Card className={className}>
      <CardHeader
        avatar={<Avatar src={avatarUrl} />}
        title={title}
        subheader="September 14, 2016"
        className={styles.header}
      />
      <CardMedia className={styles.image} image={imageUrl} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {summary}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={pathname} className={styles.actions}>
          <ChevronRightIcon />
          Виж повече
        </Button>
      </CardActions>
    </Card>
  )
}

export default NewsCard
