import React/* , { useState } */ from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../style/_style.module.scss"


const WorkTemplate = ({data, children, pageContext}) => {

  const headerImg = data.file?.childImageSharp?.gatsbyImageData

  return (
    <>
      <GatsbyImage 
        className={styles.headerImage}
        image={headerImg}
        alt={`${data.mdx?.frontmatter?.title} header image`}
      />
      <div className={styles.container}>
        <div className={styles.workContent}>
          <h1 className={styles.workTitle}>{data.mdx?.frontmatter?.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.mdx?.body }}></div>
        </div>
      </div>
    </>
)}

export default WorkTemplate

export const Head = ({ data }) => (
  <Seo title={data?.mdx?.frontmatter.seo_title} description={data?.mdx?.frontmatter.seo_description}>
    <script type="application/ld+json">{JSON.stringify({})}</script>
  </Seo>
)


export const query = graphql`
query Work($directory: String, $locale: String, $id: String) {
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