module.exports = {
  siteMetadata: {
    siteUrl: `https://seanmclane.com`,
    title: `Sean McLane`,
    author: `Sean McLane`,
    description: `The personal website of Sean McLane, alpinist`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 740,
              quality: 90
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-responsive-iframe`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-83254914-1`,
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-glamor`,
    `gatsby-plugin-react-helmet`,

  ],
}
