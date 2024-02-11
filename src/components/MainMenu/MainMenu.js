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

  const { 
          contacts
          } = useTranslations()

  const data = useStaticQuery(graphql`
  query menuCategories {
    allFile(
      filter: {sourceInstanceName: {eq: "categories"}, extension: {eq: "mdx"}, childMdx: {frontmatter: {category: {ne: "root"}}}, name: {ne: "order"}}
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
    file(name: {eq: "order"}) {
      childMdx {
        frontmatter {
          categories
        }
      }
    }
  }
`)

  const uniqueDirsAccodrdingToOrder = []
  const directoriesWithoutDublicates = data.allFile.nodes.filter((node, i, self) => {
    return i === self.findIndex((t) => {
      return t.childMdx.frontmatter.category === node.childMdx.frontmatter.category && node.childMdx.fields.locale === locale
    })
  })
  const categoriesOrder = data.file.childMdx.frontmatter.categories

  categoriesOrder.forEach(currentCat => {
    directoriesWithoutDublicates.forEach(obj => {
      obj.childMdx.frontmatter.category === currentCat && uniqueDirsAccodrdingToOrder.push(obj)
    })
  })

  const categoriesFilteredByLocale = data.allFile.nodes.filter(node => node.childMdx.fields.locale === locale)
  //const uniqueCategoriesAccordingToLocale = Array.from(new Set(directoriesWothoutDublicates.map((obj) => obj.childMdx.frontmatter.category)))

  return (
    <nav className={style.mainMenu}>
      <div className={style.container}>
        <NavLink to="/"><img src={logo1} alt="Lavori logo" height="50px"></img></NavLink>
        <LanguagesSwitcher />
      </div>
      <div className={style.container}>
        <div className={style.pages}>
          {categoriesOrder.map(currentCat => {

            let menuPoint, topLevelSlug, worksList = []

            categoriesFilteredByLocale.forEach(obj1 => {

              if (obj1.relativeDirectory.split('/')[0] === currentCat) {
                menuPoint = obj1.childMdx.frontmatter.category
                topLevelSlug = currentCat.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase().split('/')[0]
                worksList.push(obj1)
              }
            })
            
            return (
              <NavLink key={currentCat} to={`/${topLevelSlug}`}>{menuPoint}</NavLink>
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