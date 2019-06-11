import { graphql, useStaticQuery } from "gatsby"
import Teacher from "types/Teacher"

const query = graphql`
  query collective {
    allCollectiveJson {
      edges {
        node {
          _0
          _1 {
            id
            name
            photoUrl
          }
        }
      }
    }
  }
`

export interface CollectiveQuery {
  allCollectiveJson: {
    edges: {
      node: {
        _0: string
        _1: Teacher[]
      }
    }[]
  }
}

export type CollectiveTuple = [string, Teacher[]]

export interface CollectiveData extends Array<CollectiveTuple> {}

export default function useCollective(): CollectiveData {
  const data = useStaticQuery<CollectiveQuery>(query)
  const collective = data.allCollectiveJson.edges

  const parsedCollective = collective.map<CollectiveTuple>(({ node }) => {
    const { _0: role, _1: people } = node

    return [role, people]
  })

  return parsedCollective
}
