import * as React from "react"
//import { Link } from "gatsby"
import { graphql } from "gatsby"
import { StaticImage, GatsbyImage } from "gatsby-plugin-image"
import useTranslations from "../components/useTranslations"

import Seo from "../components/seo"
import Header from "../components/Header/Header"
import * as styles from "../style/_style.module.scss"
import LocalizedLink from "../components/localizedLink"


const IndexPage = ({ data, pageContext: { locale }}) => {

  const {
    about_us_title,
    about_us_text,
    read_more,
  } = useTranslations()

  const uniqueDirsAccodrdingToOrder = []
  const categoriesOrder = data.file.childMdx.frontmatter.categories
  //const allCategories = data.allFile.nodes
  const categoriesFilteredByLocale = data.allFile.nodes.filter(node => node.childMdx.fields.locale === locale)
  const directoriesWithoutDublicates = data.allFile.nodes.filter((node, i, self) => {
    return i === self.findIndex((t) => {
      return t.childMdx.frontmatter.category === node.childMdx.frontmatter.category && node.childMdx.fields.locale === locale
    })
  })
  categoriesOrder.forEach(currentCat => {
    directoriesWithoutDublicates.forEach(obj => {
      obj.childMdx.frontmatter.category === currentCat && uniqueDirsAccodrdingToOrder.push(obj)
    })
  })

  return (
    <>
      <Header />
      <section>
        <div className={styles.container}>
          <div className={styles.about}>
            <div className={styles.aboutInfo}>
              <h2>{about_us_title}</h2>
              <p>{about_us_text}</p>
            </div>            
            <StaticImage
              src="../images/about.jpg"
              alt="electrician installs electrical equipment"
            />
          </div>
        </div>
      </section>

      {categoriesOrder.map(currentCat => {

        let title
        let worksList = []
        categoriesFilteredByLocale.forEach(obj1 => {
          if (obj1.relativeDirectory.split('/')[0] === currentCat) {
            title = obj1.childMdx.frontmatter.category
            worksList.push(obj1)
          }
        })
          return (
            <section key={currentCat}>

              <div className={styles.container}>             
              <h2 className={styles.serviceTitle}>{title}</h2>
              <div className={worksList.length === 1 ? styles.monoService : styles.multiplyServices}>
                
                {worksList.length === 1 ? 
                  worksList.map(obj2 => {                  
                  return (
                    <div key={obj2.childMdx.id}>
                        <div className={styles.serviceItem}>
                          <GatsbyImage 
                            image={obj2.childMdx.frontmatter.image.childImageSharp.gatsbyImageData}
                            alt={obj2.childMdx.frontmatter.title}
                          />
                          <div>
                            <p dangerouslySetInnerHTML={{ __html: obj2.childMdx.frontmatter.teaser }}></p>

                            <LocalizedLink to={`/${obj2.relativeDirectory.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase()}`}>{read_more}</LocalizedLink>
                          </div> 
                        </div>
                    </div>
                  )
                })
                :
                worksList.map(obj2 => {                  
                  return (
                    <div key={obj2.childMdx.id}>
                        <div className={styles.serviceItem}>
                          
                          <h3 className={styles.subserviceTitle}>{obj2.childMdx.frontmatter.title}</h3>
                          <GatsbyImage
                            image={obj2.childMdx.frontmatter.image.childImageSharp.gatsbyImageData}
                            alt={obj2.childMdx.frontmatter.title}
                          />
                          <div className={styles.teaser}>
                            <p dangerouslySetInnerHTML={{ __html: obj2.childMdx.frontmatter.teaser }}></p>

                            <LocalizedLink to={`/${obj2.relativeDirectory.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase()}`}>{read_more}</LocalizedLink>
                          </div>

                        </div> 
                    </div>
                  )
                })
                }
                {worksList.map(obj2 => {                  
                  return (
                    <div key={obj2.childMdx.id}>
                      {worksList.length === 1 ?
                        <div className={styles.serviceItem}>
                          <GatsbyImage 
                            image={obj2.childMdx.frontmatter.image.childImageSharp.gatsbyImageData}
                            alt={obj2.childMdx.frontmatter.title}
                          />
                          <div>
                            <p dangerouslySetInnerHTML={{ __html: obj2.childMdx.frontmatter.teaser }}></p>

                            <LocalizedLink to={`/${obj2.relativeDirectory.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase()}`}>{read_more}</LocalizedLink>
                          </div> 
                        </div>
                         :
                        <div className={styles.serviceItem}>
                          
                          <h3 className={styles.subserviceTitle}>{obj2.childMdx.frontmatter.title}</h3>
                          <GatsbyImage
                            image={obj2.childMdx.frontmatter.image.childImageSharp.gatsbyImageData}
                            alt={obj2.childMdx.frontmatter.title}
                          />
                          <div className={styles.teaser}>
                            <p dangerouslySetInnerHTML={{ __html: obj2.childMdx.frontmatter.teaser }}></p>

                            <LocalizedLink to={`/${obj2.relativeDirectory.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase()}`}>{read_more}</LocalizedLink>
                          </div>

                        </div>                        
                      }
                    </div>
                  )
                })}
                </div>

              </div>
            </section>
          )
      })}
    </>
  )
}

export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
query getMainPageData {
  file(name: {eq: "order"}) {
    name
    childMdx {
      frontmatter {
        categories
      }
    }
  }
  allFile(
    filter: {sourceInstanceName: {eq: "categories"}, name: {ne: "order"}, extension: {eq: "mdx"}, childMdx: {frontmatter: {category: {ne: "root"}}}}
  ) {
    nodes {
      childMdx {
        frontmatter {
          category
          title
          teaser
          image {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        fields {
          locale
        }
        id
        
      }
      relativeDirectory
    }
  }
}
`
