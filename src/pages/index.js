import React from "react"
import ReactGoogleSheetConnector from "react-google-sheet-connector"

import Loader from "../components/Loader"
import Listings from "../components/Listings"
import Page from "../components/Page"
import cs from "./index.module.css"

export default () => (
  <Page>
    {typeof window !== `undefined` && (
      <ReactGoogleSheetConnector
        apiKey={process.env.GATSBY_API_KEY}
        spreadsheetId={process.env.GATSBY_SPREADSHEET_ID}
        spinner={
          <div className={cs.loaderContainer}>
            <Loader />
          </div>
        }
      >
        <Listings />
      </ReactGoogleSheetConnector>
    )}
  </Page>
)
