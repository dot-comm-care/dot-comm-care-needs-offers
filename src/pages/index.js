import React from "react"
import ReactGoogleSheetConnector from "react-google-sheet-connector"

import Loader from "../components/Loader"
import Listings from "../components/Listings"
import Page from "../components/Page"
import cs from "./index.module.css"

class App extends React.Component {
  render() {
    console.log(process.env.GATSBY_SHEETS_API_KEY, process.env.GATSBY_SHEET_ID)
    return (
      <Page>
        <ReactGoogleSheetConnector
          apiKey={process.env.GATSBY_SHEETS_API_KEY}
          spreadsheetId={process.env.GATSBY_SHEET_ID}
          spinner={
            <div className={cs.loaderContainer}>
              <Loader />
            </div>
          }
        >
          <Listings />
        </ReactGoogleSheetConnector>
      </Page>
    )
  }
}

export default App
