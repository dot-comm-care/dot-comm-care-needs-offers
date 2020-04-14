import React from "react"

import Page from "../components/Page"

export default () => (
  <Page>
    <iframe
      title="New Form"
      src={process.env.GATSBY_REQUEST_FORM_URL}
      width="640"
      height="1089"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
    >
      Loading…
    </iframe>
  </Page>
)
