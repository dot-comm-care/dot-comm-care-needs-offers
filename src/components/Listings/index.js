import React from "react"
import { Link } from "gatsby"
import { connectToSpreadsheet } from "react-google-sheet-connector"
import classnames from "classnames"

import { TYPES, OFFERS_SHEET_NAME } from "../../utils/listingUtils"
import Listing from "../Listing"
import cs from "./styles.module.css"

class Listings extends React.Component {
  state = {
    typeFilter: TYPES[0],
  }

  render() {
    const { typeFilter } = this.state
    let filters = {}

    if (typeFilter !== TYPES[0]) {
      filters["typeOfSupport?"] = typeFilter
    }

    const listings = this.props
      .getSheet(OFFERS_SHEET_NAME)
      .getData()

    return (
      <div>
        <div className={cs.actions}>
          <Link to="/new">
            <button>New Offer</button>
          </Link>
          <div className={cs.filters}>
            {TYPES.map(filter => (
              <button
                key={filter}
                className={classnames(cs.filter, {
                  [cs.selectedFilter]: filter === typeFilter,
                  [cs.notSelectedFilter]: filter !== typeFilter,
                })}
                onClick={() => {
                  this.setState({ typeFilter: filter })
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className={cs.listings}>
          {listings.map((listing, i) => (
            <Listing listing={listing}></Listing>
          ))}
        </div>
      </div>
    )
  }
}

export default connectToSpreadsheet(Listings)
