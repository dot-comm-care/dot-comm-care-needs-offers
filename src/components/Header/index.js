import React from "react"

import cs from "./styles.module.css"

export default () => {
  return (
    <header className={cs.header}>
      <div className={cs.logo}>
        <a href="https://mutualaidmamas.com/">
          <img
            src={require("./MAMAS-logo.png")}
            className={cs.logo}
            alt="MAMS logo"
          />
          <p>mutualaidmamas.com</p>
        </a>
      </div>
      <h1 className={cs.headerTitle}>Requests List</h1>
    </header>
  )
}
