import { graphql } from "gatsby"
import Schedule from "@Components/Schedule"

export const query = graphql`
  query schedule {
    allScheduleJson {
      edges {
        node {
          _0
          _1
          _2
          _3
          _4
          _5
          _6
          _7
          _8
        }
      }
    }
  }
`

export default Schedule
