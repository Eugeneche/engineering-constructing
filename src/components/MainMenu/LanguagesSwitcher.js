import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import * as style from "./_MainMenu.module.scss"
import { LocaleContext } from "../layout"

/* import ukr from "../../images/ukr.svg"
import eng from "../../images/eng.svg"
import cze from "../../images/cze.svg" */
//import LocalizedLink from "../localizedLink"
//import useTranslations from "../useTranslations"



const LanguagesSwitcher = () => {

  //const isBrowser = typeof window !== "undefined"
  //const { headerHero } = useTranslations()

  const [path, setPath] = useState('')

  const locale = React.useContext(LocaleContext)

  /* if (!isBrowser) {
    return
  } */

/*   const path = () => {
    if (window.location.pathname.match(`/${locale.locale}/`)) {
      return window.location.pathname.slice(3)
    } else { 
      return window.location.pathname
    }
  } */

  useEffect(() => {
    if (window.location.pathname.match(`/${locale.locale}/`)) {
      setPath(window.location.pathname.slice(3))
    } else { 
      setPath(window.location.pathname)
    }
  })

  const styleActive = {
    fontWeight: "300",
    textDecoration: "underline"
  }

  const styleRegular = {
    fontWeight: "600",
    textDecoration: "none"
  }

  return (
    <div className={style.langs}>
      <Link to={`${path}`} hrefLang="cs" style={locale.locale === "cs" ? styleActive : styleRegular}>
        CZ
      </Link>
      {`|`}
      <Link to={`/en${path}`} hrefLang="en" style={locale.locale === "en" ? styleActive : styleRegular}>
        EN
      </Link>
      {`|`}
      <Link to={`/uk${path}`} hrefLang="uk" style={locale.locale === "uk" ? styleActive : styleRegular}>
        UA
      </Link>
    </div>
  )
}

export default LanguagesSwitcher