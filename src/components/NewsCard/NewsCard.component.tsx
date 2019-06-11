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
    <Card className={className}>
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
      <CardActions>
        {/* TODO: align to bottom */}
        <Button component={Link} to={pathname} className={styles.actions}>
          <ChevronRightIcon />
          Виж повече
        </Button>
      </CardActions>
    </Card>
  )
}

export default NewsCard
