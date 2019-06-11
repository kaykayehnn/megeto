import { graphql } from "gatsby"
import News from "@Components/News"

export const query = graphql`
  query news {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          date(locale: "bg", formatString: "D MMM YYYY")
          excerpt
          path
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

export default News
