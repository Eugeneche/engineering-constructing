import React/* , { useState } */ from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
//import * as styles from "../style/_style.module.scss"
import { GatsbyImage } from "gatsby-plugin-image"
//import close from "../images/close_icon.svg"
//import ImagesSwiper from "../components/ImagesSwiper/ImagesSwiper"


const workTemplate = ({data, pageContext, children}) => {

  const headerImg = data.file?.childImageSharp?.gatsbyImageData

  return (
    <>
      <GatsbyImage 
        image={headerImg}
        alt={`${data.mdx?.frontmatter?.title} header image`}
      />
      <h1>{data.mdx?.frontmatter?.title}</h1>
      <p>{data.mdx?.body}</p>
    </>
)}

export default workTemplate

export const Head = ({ data }) => (
  <Seo title="title" description="description"/* {data?.mdx?.frontmatter.seo_title} description={data?.mdx?.frontmatter.seo_description} */>
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