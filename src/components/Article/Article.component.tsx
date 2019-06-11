import React, { FunctionComponent } from "react"

import styles from "./Article.module.scss"
import ArticleType from "types/Article"
import Content from "@Components/Content"
import {
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
} from "@material-ui/core"
import { Helmet } from "react-helmet"

export interface ArticleProps {
  data: {
    allWordpressPost: {
      edges: {
        node: ArticleType
      }[]
    }
  }
}

const Article: FunctionComponent<ArticleProps> = ({ data }) => {
  const post = data.allWordpressPost.edges[0].node

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <Content maxWidth="760px">
        <article>
          <Card>
            <CardHeader
              avatar={
                <Avatar
                  src={post.author.avatar_urls.wordpress_96}
                  alt="Author"
                  className={styles.avatar}
                />
              }
              title={post.title}
              titleTypographyProps={{
                variant: "h3",
                component: "h1",
                gutterBottom: true,
              }}
              subheader={post.date}
            />
            <img
              src={post.featured_media.source_url}
              alt={post.featured_media.alt_text}
              className={styles.image}
            />
            <CardContent>
              {post.paragraphs.map(p => (
                <Typography
                  key={p}
                  variant="body1"
                  component="p"
                  gutterBottom
                  className={styles.paragraph}
                >
                  {p}
                </Typography>
              ))}
            </CardContent>
            <CardActions />
          </Card>
        </article>
      </Content>
    </>
  )
}

export default Article
