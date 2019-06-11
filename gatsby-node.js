const path = require("path")
const createPathsMapper = require("./config/path-mapper")

exports.onCreateWebpackConfig = function({ actions }) {
  actions.setWebpackConfig({
    resolve: {
      alias: createPathsMapper(path.join(__dirname, "src")),
    },
  })
}

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    {
      allWordpressPost {
        edges {
          node {
            path
          }
        }
      }
    }
  `)

  const { createPage } = actions
  data.allWordpressPost.edges.map(({ node }) => {
    createPage({
      path: node.path,
      component: path.resolve("./src/templates/article.tsx"),
      context: {
        // path is reserved for Gatsby
        pathname: node.path,
      },
    })
  })
}
