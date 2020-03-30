import React from "react"
import classnames from "classnames"

import Header from "../Header"
import Footer from "../Footer"
import "./normalize.css"
import "./skeleton.css"
import cs from "./styles.module.css"

/* fonts */
require("typeface-nunito")

export default props => (
  <div>
    <Header />
    <main className={classnames(cs.page, props.className)}>
      {props.children}
    </main>
    <Footer />
  </div>
)
