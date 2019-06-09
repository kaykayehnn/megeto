const path = require("path")
const createPathsMapper = require("./config/path-mapper")

exports.onCreateWebpackConfig = function({ actions }) {
  actions.setWebpackConfig({
    resolve: {
      alias: createPathsMapper(path.join(__dirname, "src")),
    },
  })
}
