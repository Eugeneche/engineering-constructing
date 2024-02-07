import * as React from "react"
//import { Link } from "gatsby"
//import { StaticImage } from "gatsby-plugin-image"

//import Layout from "../components/layout"
import Seo from "../components/seo"
import Header from "../components/Header/Header"
//import * as styles from "../components/index.module.css"


const IndexPage = () => {
  
  return (
  <>
    <Header />
    <h1>Home</h1>
  </>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
