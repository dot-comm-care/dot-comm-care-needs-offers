import React from "react"

import cs from "./styles.module.css"

export default () => {
  return (
    <header className={cs.header}>
      <a href="https://mutualaidmamas.com/">
        <img
          src={require("./MAMAS-logo.png")}
          className={cs.logo}
          alt="MAMS logo"
        />
        <p>mutualaidmamas.com</p>
      </a>
      <h1 className={cs.headerTitle}>Offers List</h1>
    </header>
  )
}
