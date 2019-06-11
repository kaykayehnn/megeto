import Article from "@Components/Article"
import { graphql } from "gatsby"

export const query = graphql`
  query article($path: String!) {
    allWordpressPost(filter: { path: { eq: $path } }) {
      edges {
        node {
          title
          date(locale: "bg", formatString: "D MMM YYYY")
          paragraphs
          path
          excerpt
          author {
            name
            avatar_urls {
              wordpress_96
            }
          }
          featured_media {
            source_url
            alt_text
          }
        }
      }
    }
  }
`

export default Article
