import React from "react"

import cs from "./styles.module.css"

export default () => (
  <div className={cs.loaderContainer}>
    <div className={cs.loader} />
    Loading...
  </div>
)
