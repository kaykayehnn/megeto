/**
 * Copied from https://github.com/kaykayehnn/typescript-react-redux-boilerplate/blob/283b0fe768afdc79af3a2bfed9a218878ecf75e8/config/path-mapper.js
 */

const path = require("path")
const { compilerOptions } = require("../tsconfig")

const { paths } = compilerOptions

module.exports = function createPathMapper(prefix, isJest) {
  const pathKeys = Object.keys(paths)

  const mapper = {}
  for (let i = 0; i < pathKeys.length; i++) {
    let key = pathKeys[i]
    let value = paths[key]

    if (value.length > 1) {
      throw new Error(
        "Mapping paths is only supported for key-value type lookups"
      )
    }

    value = value[0]
    if (key.slice(-2) === "/*" && value.slice(-2) === "/*") {
      key = key.slice(0, -2)
      value = value.slice(0, -2)
    }
    if (isJest) {
      key += "/(.*)$"
      value += "/$1"
    }

    mapper[key] = path.join(prefix, value)
  }

  return mapper
}
