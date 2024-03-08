import React, { useEffect, useRef } from "react"
//import { Link } from "gatsby"
import { graphql } from "gatsby"
import { StaticImage, GatsbyImage } from "gatsby-plugin-image"
import useTranslations from "../components/useTranslations"

import Seo from "../components/seo"
import Header from "../components/Header/Header"
import * as styles from "../style/_style.module.scss"
import "../style/s.css"
import LocalizedLink from "../components/localizedLink"

//import { register } from 'swiper/element/bundle'
import { Swiper, SwiperSlide } from "../components/Swiper/Swiper"
import { Pagination } from 'swiper/modules'

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
            <section key={currentCat} style={worksList.length === 1 ? {background: "none"} : {background: "#ebebeb", padding: "1px 0 0 0"}}>

              <div className={styles.container}>             
              <h2 className={styles.serviceTitle}>{title}</h2>
              
              
                {worksList.length === 1 ? 
                  
                  worksList.map(obj2 => {                  
                    return (
                      <div key={obj2.childMdx.id}>
                          <div className={styles.singleServiceItem}>
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
                  :     
                  <Swiper init="false"/* slides-per-view="2" speed="500" loop="true" navigation="true" autoplay="true" space-between="20" *//* id={currentCat.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase()} */
                    slidesPerView={3}
                    navigation={true}
                    loop={true}
                    pagination={true}
                    modules={[Pagination]}
                    autoHeight={true}
                    /* height={500} */
                    autoplay={true}
                    spaceBetween="20"
                    breakpoints={
                      { 0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 }
                     }
                    }
                  >          
                  {worksList.map(obj2 => {                  
                    return (
                      <SwiperSlide key={obj2.childMdx.id}>
                        <div className={styles.multiplyServiceItem}>
                          
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
                      </SwiperSlide>
                    )
                  })}
                  </Swiper>
                }
                
                

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
