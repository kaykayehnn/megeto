/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const sanitizeHtml = require("sanitize-html")
const cyrillicToLatin = require("./config/cyrillic-to-latin")

if (process.env.WORDPRESS_USER == null) require("dotenv").config()

// In your gatsby-config.js
module.exports = {
  siteMetadata: {
    schoolType: "Математическа Гимназия",
    schoolName: "Академик Кирил Попов",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-material-ui",
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve("./src/components/Layout/index.ts"),
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    "gatsby-plugin-sass",
    "gatsby-plugin-svgr",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/data/`,
      },
    },
    "gatsby-transformer-json",
    /*
     * Gatsby's data processing layer begins with “source”
     * plugins. Here the site sources its data from Wordpress.
     */
    {
      resolve: "gatsby-source-wordpress",
      options: {
        /*
         * The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
         * Example : 'gatsbyjsexamplewordpress.wordpress.com' or 'www.example-site.com'
         */
        baseUrl: "megeto1.school.blog",
        // The protocol. This can be http or https.
        protocol: "https",
        // Indicates whether the site is hosted on wordpress.com.
        // If false, then the assumption is made that the site is self hosted.
        // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
        // If your site is hosted on wordpress.org, then set this to false.
        hostingWPCOM: true,
        // If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
        // This feature is untested for sites hosted on wordpress.com.
        // Defaults to true.
        useACF: true,
        auth: {
          wpcom_app_clientSecret: process.env.WORDPRESS_CLIENT_SECRET,
          wpcom_app_clientId: "65941",
          wpcom_user: process.env.WORDPRESS_USER,
          wpcom_pass: process.env.WORDPRESS_PASSWORD,
        },
        normalizer: ({ entities }) => {
          const paragraphRgx = /<p>(.+?)<\/p>/g

          const transformed = entities.map(e => {
            if (e.__type === "wordpress__POST") {
              e.excerpt = sanitizeHtml(e.excerpt, {
                allowedTags: [],
              })
              // Split content to an array of paragraphs
              e.paragraphs = sanitizeHtml(e.content, { allowedTags: ["p"] })
                .match(paragraphRgx)
                .map(m => m.slice(3, -4))
              e.content = sanitizeHtml(e.content, { allowedTags: [] })

              e.title = e.title.replace("&nbsp;", " ")
              e.path = cyrillicToLatin(decodeURIComponent(e.path))
              e.slug = cyrillicToLatin(decodeURIComponent(e.slug))
            }

            return e
          })

          require("fs").writeFileSync(
            "data.json",
            JSON.stringify(transformed, null, 2)
          )
          return transformed
        },
      },
    },
  ],
}
