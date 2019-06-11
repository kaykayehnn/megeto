import { useStaticQuery, graphql } from "gatsby"

const getSchoolQuery = graphql`
  query getSchool {
    site {
      siteMetadata {
        schoolType
        schoolName
      }
    }
  }
`

export interface SchoolQuery {
  site: {
    siteMetadata: {
      schoolType: string
      schoolName: string
    }
  }
}

export default function useSiteMeta() {
  const data: SchoolQuery = useStaticQuery(getSchoolQuery)
  return data.site.siteMetadata
}
