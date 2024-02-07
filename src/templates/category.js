import * as React from "react"
import { graphql } from "gatsby"
//import * as commonStyles from "../../style/_style.module.scss"
//import * as catsStyle from "./_categoryPage.module.scss"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"
//import ContentSliderItemCategory from "../ContentSlider/ContentSliderItemCategory"

const CategoryPage = ({data, pageContext}) => {

  const headerImg = data.file?.childImageSharp?.gatsbyImageData
  console.log(data)
  return (
    <>
      <GatsbyImage 
        image={headerImg}
        alt={`${data.mdx?.frontmatter?.title} header image`}
      />
      <h1>{data.mdx?.frontmatter?.title}</h1>
      <p>{data.mdx?.body}</p>
    </>
  )
}

export default CategoryPage

export const Head = ({ data, pageContext }) => (
  <Seo title="title" description="description"/* {pageContext.categoryName} description={`CRUISEEASE Car rental. ${pageContext.categoryName} - without a deposite, fast, convenient`} */>
    <script type="application/ld+json">{JSON.stringify({})}</script>
  </Seo>
)

export const query = graphql`
query Category($directory: String, $locale: String, $id: String) {
  allFile(
    filter: {sourceInstanceName: {eq: "categories"}, extension: {eq: "jpg"}, relativeDirectory: {eq: $directory}}
  ) {
    nodes {
      name
      childImageSharp {
        gatsbyImageData
        id
      }
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
  file(
    relativeDirectory: {eq: $directory}
    name: {eq: "header"}
  ) {
    childImageSharp {
      gatsbyImageData
    }
  }
}
`

