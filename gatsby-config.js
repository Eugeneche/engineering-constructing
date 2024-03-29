/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Lavori | Stavební a montážní práce`,
    description: `Stavební a instalační práce`,
    author: `@websolutionsforyou.com`,
    siteUrl: `https://lavoritech.cz`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `index`,
        path: `${__dirname}/data/index`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `categories`,
        path: `${__dirname}/data/categories`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/config/translations`,
        name: `translations`,
      },
    },

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            allSitePage {
              nodes {
                path
                pageContext
              }
            }
          }
        `,
        output: `/`,
        excludes: ['/en/404.html', '/uk/404.html', '/en/404/', '/uk/404/'],
        resolveSiteUrl: () => `https://lavoritech.cz`,
        serialize: ({ path, pageContext }) => {
          return {
            url: path,
            lastmod: pageContext.modifiedTime,
          }
        },
      }
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://lavoritech.cz',
        sitemap: 'https://lavoritech.cz/sitemap-index.xml',
        policy: [{userAgent: '*', allow: '/', disallow: ['/en/404.html', '/uk/404.html', '/en/404/', '/uk/404/', '/*?utm_source=', '/*?utm_medium=', '/*?utm_campaign=']}],
      }
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-LPZHY0VHE4" 
        ],
        pluginConfig: {
          head: true,
          respectDNT: true,
          exclude: []
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
