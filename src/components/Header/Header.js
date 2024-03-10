import React from "react"
import * as styles from "./_Header.module.scss"
import { StaticImage } from "gatsby-plugin-image"
import useTranslations from "../useTranslations"

const Header = () => {

    const {
        headline_1,
        headline_2
      } = useTranslations()

    return (
        <div className={styles.header}>
            <StaticImage
                className={styles.headerImage}
                src="../../images/main_header.jpg"
                alt="electric equipment"
            />
            <div className={styles.headlinesContainer}>
                {/* <div className={styles.headlinesBg}> */}
                    <h1>{headline_1}</h1>
                    <h2>{headline_2}</h2>
                {/* </div> */}
            </div>

        </div>
    )

}

export default Header