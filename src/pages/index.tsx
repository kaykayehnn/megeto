import { graphql } from "gatsby"
import Home from "@Components/Home"

export const query = graphql`
  query home {
    allWordpressPost(limit: 3, sort: { fields: [date], order: DESC }) {
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

export default Home
