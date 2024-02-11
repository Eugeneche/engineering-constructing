import React from "react"
import LocalizedLink from "../localizedLink"

const linkStyles = {
    color: "#249300",
    textDecoration: "none"
}

const activeStyles = {
    color: "#90f56f",
    textDecoration: "underline"
}

const NavLink = ({ props, children, to }) => (
    <LocalizedLink to={to} style={linkStyles} activeStyle={activeStyles}>
      {children}
    </LocalizedLink>
)
  
  export default NavLink