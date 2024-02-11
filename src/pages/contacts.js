import * as React from "react"
import useTranslations from "../components/useTranslations"
//import { Link } from "gatsby"

import Seo from "../components/seo"

const Contacts = () => {

  const {
    contacts
  } = useTranslations()
  
  return (
  <>
    <h1>{contacts}</h1>
  </>
  )
}

export const Head = () => <Seo title="Page two" />

export default Contacts
