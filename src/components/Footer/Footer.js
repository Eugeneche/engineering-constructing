import React from "react"
import * as styles from "./_Footer.module.scss"
//import insta from "../../images/insta.svg"
import phone from "../../images/phone.svg"
import location from "../../images/location.svg"
import logo from "../../images/logo_transparent.png"
import envelope from "../../images/envelope.svg"

const Footer = () => {

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.logo}><img src={logo} alt="Lavori tech s.r.o. logo"></img>
                    <div>© 2023 - {new Date().getFullYear()} Lavori tech s.r.o.</div>
                    <div>IČO 21055777</div>
                </div>
                <div className={styles.contact}><img src={location} alt="location icon"></img>Bílkova 855/19, 110 00 Praha 1</div>
                <div className={styles.contacts}>
                    <div><img src={phone} alt="phone icon"></img><a href="tel:+420725381615">+420 725 381 615</a></div>
                    <div><img src={envelope} alt="envelope icon"></img><a href="mailto:lavori.tech@seznam.cz">lavori.tech@seznam.cz</a></div>
                </div>


            </div>
            <p style={{fontSize: "12px", color: "#8f8f8f", textAlign: "center", margin: "0 0 6px"}}>Developed by
          <a href="https://websolutionsforyou.com/" target="_blank"> websolutionsforyou.com</a></p>
        </footer>
    )

}

export default Footer