import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { LocaleContext } from "./layout"

const useTranslations = () => {
  // Grab the locale (passed through context) from the Context Provider
  const { locale } = React.useContext(LocaleContext)
  // Query the JSON files in <rootDir>/i18n/translations
  const { rawData } = useStaticQuery(query)

  // Simplify the response from GraphQL
  const simplified = rawData?.edges?.map(item => {
    return {
      name: item?.node?.name,
      translations: item?.node?.childTranslationsJson,
    }
  })

  // Only return translations for the current locale
  const { translations } = simplified.filter(lang => lang.name === locale)[0]

  return translations
}

export default useTranslations

const query = graphql`
  query useTranslations {
    rawData: allFile(filter: { sourceInstanceName: { eq: "translations" } }) {
      edges {
        node {
          name
          childTranslationsJson {
            headerHero
            seo_title
            seo_description
            home
            projects
            contacts
            index_H2_1
            chapter_1
            index_H2_2
            chapter_2_1
            chapter_2_2
            chapter_2_3
            chapter_2_4
            your_name
            your_message
            your_email
            your_phone
            send
            name
            phone
            email
            message
            write_to_email
            four_o_four_title
            four_o_four_text
          }
        }
      }
    }
  }
`
