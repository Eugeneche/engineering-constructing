import * as React from "react"
import { graphql } from "gatsby"
//import * as catsStyle from "./_categoryPage.module.scss"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"
import LocalizedLink from "../components/localizedLink"
import * as styles from "../style/_style.module.scss"
//import ContentSliderItemCategory from "../ContentSlider/ContentSliderItemCategory"

const CategoryPage = ({data, pageContext}) => {

  const headerImg = data.file?.childImageSharp?.gatsbyImageData
  const worksFromCurrentDir = data.allFile.nodes.filter(node => {
    return node.relativeDirectory.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase().split('/')[0] === pageContext.directory.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase()
  })

  return (
    <>
      <GatsbyImage 
        className={styles.headerImage}
        image={headerImg}
        alt={`${data.mdx?.frontmatter?.title} header image`}
      />
      <div className={styles.container}>
        <h1>{data.mdx?.frontmatter?.title}</h1>
        <div className={styles.categoryContent} dangerouslySetInnerHTML={{ __html: data.mdx?.body }}></div>
        <div className={styles.categoriesGrid}>
          {worksFromCurrentDir.map(obj => {
            return (
              <div className={styles.workItem} key={obj.id}>
                <LocalizedLink to={`/${obj.relativeDirectory.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase()}`}>
                  <GatsbyImage                    
                    image={obj.childMdx.frontmatter.image.childImageSharp.gatsbyImageData}
                    alt={obj.childMdx.frontmatter.title}
                    className={styles.workItemImage}
                  />
                  <h3>{obj.childMdx.frontmatter.title}</h3>
                </LocalizedLink>
              </div>
            )
          })}
        </div>
      </div>

    </>
  )
}

export default CategoryPage

export const Head = ({ data }) => (
  <Seo title={data?.mdx?.frontmatter.seo_title} description={data?.mdx?.frontmatter.seo_description}>
    <script type="application/ld+json">{JSON.stringify({})}</script>
  </Seo>
)

export const query = graphql`
query Category($directory: String, $locale: String, $id: String) {
  allFile(
    filter: {sourceInstanceName: {eq: "categories"}, extension: {eq: "mdx"}, relativeDirectory: {}, name: {ne: "order"}, childMdx: {frontmatter: {category: {ne: "root"}}, fields: {locale: {eq: $locale}}}}
  ) {
    nodes {
      name
      id
      childMdx {
        frontmatter {
          category
          title
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
      relativeDirectory
    }
  }
  mdx(fields: {locale: {eq: $locale}}, id: {eq: $id}) {
    body
    frontmatter {
      seo_description
      seo_title
      title
    }
  }
  file(relativeDirectory: {eq: $directory}, name: {eq: "header"}) {
    childImageSharp {
      gatsbyImageData
    }
  }
}
`

