import React from "react"
import * as styles from "./_Header.module.scss"
import { StaticImage } from "gatsby-plugin-image"

const Header = () => {

    return (
        <>
            <StaticImage
                className={styles.headerImage}
                src="../../images/main_header.jpg"
                alt="electric equipment"
            />
        </>
    )

}

export default Header