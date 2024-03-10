import * as React from "react"
import useTranslations from "../components/useTranslations"
import * as styles from "../style/_style.module.scss"

import Seo from "../components/seo"

const Contacts = () => {

  const {
    contacts,
    phone,
    email,
    address

  } = useTranslations()
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.contactsContent}>
          <h1 className={styles.contactsTitle}>{contacts}</h1>
          <div className={styles.contactsList}>
            <ul>
              <li><span>{phone}</span><span><a href="tel:+420725381615">+420 725 381 615</a></span></li>
              <li><span>{email}</span><span><a href="mailto:lavori.tech@seznam.cz">lavori.tech@seznam.cz</a></span></li>
              <li><span>{address}</span><span>Bílkova 855/19, 110 00 Praha 1</span></li>
            </ul>
            <div className={styles.registerInfo}>Lavori tech s.r.o., IČO 21055777</div>
          </div>
        </div>
      </div>
    </>
  )
}

export const Head = () => <Seo title="Page two" />

export default Contacts
