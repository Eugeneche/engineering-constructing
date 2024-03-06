import React, { useState } from "react"
import useTranslations from "../useTranslations"
import LanguagesSwitcher from "./LanguagesSwitcher"
import NavLink from "./NavLink"
import { useStaticQuery, graphql } from "gatsby"
//import { AnchorLink } from "gatsby-plugin-anchor-links"
import * as style from "./_MainMenu.module.scss"
//import logo from "../../images/logo_sm.jpg"
import logo from "../../images/logo_transparent.png"
import hamburgerStroke from "../../images/menu_stroke.svg"
import close from "../../images/close.svg"

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

  const [ isShow, setIsShow ] = useState(false)

  const styleBcShow = {
    left: "10%",
    /* height: "90vh", */
    bottom: "5%",
    right: "10%",
    padding: "6vh 0",
    transition: "all ease 0.5s"
  }

  const styleBcHide = {
    left: "-10%",
    right: "100%",
    bottom: "95%",
    padding: "0",
    /* height: "0vh", */
    transition: "all ease 0.3s",
    /* transition: "bottom ease 1s" */
  }

  const categoriesFilteredByLocale = data.allFile.nodes.filter(node => node.childMdx.fields.locale === locale)

  return (
    <nav>
      <div className={style.mainMenu}>
        <div className={style.container}>
          <NavLink to="/"><img src={logo} alt="Lavori logo" height="50px"></img></NavLink>
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
           
            <NavLink to="/contacts">{contacts}</NavLink>
          </div>
        </div>
      </div>

      <div className={style.mobileMenu}>
        <NavLink to="/"><img className={style.logoMobile} src={logo} alt="logo"></img></NavLink>
        <LanguagesSwitcher />
        <button onClick={() => setIsShow(true)}><img className={style.hamburger} src={hamburgerStroke} alt="hamburger menu icon"></img></button>
      </div>

      <div className={style.mobileMenuShadow} style={isShow ? {display: "block"} : {display: "none"}}>        
      </div>

      <div className={style.mobileMenuBackground} style={isShow ? styleBcShow : styleBcHide}>
        <button onClick={() => setIsShow(false)}>
          <img className={style.close} src={close} alt="close menu icon"></img>
        </button>
        <div className={style.container}>
          <NavLink to="/"><img src={logo} alt="Lavori logo" height="50px"></img></NavLink>
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
           
            <NavLink to="/contacts">{contacts}</NavLink>
          </div>
        </div>
      </div>

    </nav>
  )
}

export default MainMenu