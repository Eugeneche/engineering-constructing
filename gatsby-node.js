const path = require(`path`)
const locales = require(`./config/i18n`)
const {
  localizedSlug,
  findKey,
  removeTrailingSlash,
} = require(`./src/utils/gatsby-node-helpers`)

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // First delete the incoming page that was automatically created by Gatsby
  // So everything in src/pages/
  deletePage(page)

  // Grab the keys ('en' & 'de') of locales and map over them
  Object.keys(locales).map(lang => {
    // Use the values defined in "locales" to construct the path
    const localizedPath = locales[lang].default
      ? page.path
      : `${locales[lang].path}${page.path}`

    return createPage({
      // Pass on everything from the original page
      ...page,
      // Since page.path returns with a trailing slash (e.g. "/de/")
      // We want to remove that
      path: removeTrailingSlash(localizedPath),
      // Pass in the locale as context to every page
      // This context also gets passed to the src/components/layout file
      // This should ensure that the locale is available on every page
      context: {
        ...page.context,
        locale: lang,
        dateFormat: locales[lang].dateFormat,
      },
    })
  })
}

// As you don't want to manually add the correct language to the frontmatter of each file
// a new node is created automatically with the filename
// It's necessary to do that -- otherwise you couldn't filter by language
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  // Check for "Mdx" type so that other files (e.g. images) are exluded
  if (node.internal.type === `Mdx`) {

    // Use path.basename
    // https://nodejs.org/api/path.html#path_path_basename_path_ext
    const name = path.basename(node.internal.contentFilePath, `.mdx`)

    // Check if post.name is "index" -- because that's the file for default language
    // (In this case "en")
    const isDefault = name === `index`

    // Find the key that has "default: true" set (in this case it returns "en")
    const defaultKey = findKey(locales, o => o.default === true)

    // Files are defined with "name-with-dashes.lang.mdx"
    // name returns "name-with-dashes.lang"
    // So grab the lang from that string
    // If it's the default language, pass the locale for that
    const lang = isDefault ? defaultKey : name.split(`.`)[1]

    createNodeField({ node, name: `locale`, value: lang })
    createNodeField({ node, name: `isDefault`, value: isDefault })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const workTemplate = path.resolve(`./src/templates/work.js`)
  const categoryTemplate = path.resolve(`./src/templates/category.js`)

  const { data } = await graphql(`
  query getRootCategories {
    allFile(
      filter: {sourceInstanceName: {eq: "categories"}, extension: {eq: "mdx"}, name: {ne: "order"}, childMdx: {frontmatter: {category: {eq: "root"}}}}
    ) {
      nodes {
        relativeDirectory
        childMdx {
          id
          fields {
            isDefault
            locale
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
  `)

  const works = await graphql(`
  query getWorks {
    allFile(
      filter: {sourceInstanceName: {eq: "categories"}, extension: {eq: "mdx"}, name: {ne: "order"}, childMdx: {frontmatter: {category: {ne: "root"}}}}
    ) {
      nodes {
        relativeDirectory
        childMdx {
          id
          fields {
            isDefault
            locale
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
  `)

  if (data.errors) {
    console.error(data.errors)
    return
  }

  data.allFile.nodes.forEach(node => {
    const slug = node.relativeDirectory.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase().split('/')[0]
    const id = node.childMdx.id
    const directory = node.relativeDirectory
    const locale = node.childMdx.fields.locale
    const isDefault = node.childMdx.fields.isDefault

    createPage({
      path: localizedSlug({ isDefault, locale, slug }),
      component: categoryTemplate,
      context: {
        locale,
        id,
        directory,
      },
    })
  })

  works.data.allFile.nodes.forEach(node => {

    const slug = node.relativeDirectory.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase()
    const id = node.childMdx.id
    const directory = node.relativeDirectory
    const locale = node.childMdx.fields.locale
    const isDefault = node.childMdx.fields.isDefault

    createPage({
      path: localizedSlug({ isDefault, locale, slug }),
      component: workTemplate,
      context: {
        locale,
        id,
        directory,
      },
    })
  })
}