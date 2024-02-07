import React from "react"
import useTranslations from "../useTranslations"
import LanguagesSwitcher from "./LanguagesSwitcher"
import NavLink from "./NavLink"
import { useStaticQuery, graphql } from "gatsby"
//import { AnchorLink } from "gatsby-plugin-anchor-links"
import * as style from "./_MainMenu.module.scss"
//import logo from "../../images/logo_sm.jpg"
import logo1 from "../../images/logo_transparent.png"

const MainMenu = ({locale}) => {

  const { /* home, */
          /* projects, */
          contacts
          } = useTranslations()

  const data = useStaticQuery(graphql`
  query allCategories {
    allFile(
      filter: {sourceInstanceName: {eq: "categories"}, extension: {eq: "mdx"}}
    ) {
      nodes {
        relativeDirectory
        id
        childMdx {
          fields {
            locale
          }
          frontmatter {
            category
          }
        }
      }
    }
  }
`)

  const directoriesWothoutDublicates = data.allFile.nodes.filter((node, i, self) => {
    return i === self.findIndex((t) => {
      return t.childMdx.frontmatter.category === node.childMdx.frontmatter.category && node.childMdx.fields.locale === locale
    })
  })

  //const dirsFilteredByLocale = data.allFile.nodes.filter(node => node.childMdx.fields.locale === locale)
  //const uniqueCategoriesAccordingToLocale = Array.from(new Set(directoriesWothoutDublicates.map((obj) => obj.childMdx.frontmatter.category)))

  return (
    <nav className={style.mainMenu}>
      <div className={style.container}>
        <NavLink to="/"><img src={logo1} alt="Lavori logo" height="50px"></img></NavLink>
        <LanguagesSwitcher />
      </div>
      <div className={style.container}>
        <div className={style.pages}>
          {directoriesWothoutDublicates.map(obj => {
            const topLevelSlug = obj.relativeDirectory.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase().split('/')[0]
            return (
              <NavLink key={obj.id} to={`/${topLevelSlug}`}>{obj.childMdx.frontmatter.category}</NavLink>
            )
          })}
          {/* <AnchorLink to={locale === `en` ? `/#projects` : `/${locale}/#projects`}>{projects}</AnchorLink> */}
          <NavLink to="/contacts">{contacts}</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default MainMenu