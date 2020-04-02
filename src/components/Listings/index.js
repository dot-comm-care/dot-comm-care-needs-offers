import React from "react"
import { Link } from "gatsby"
import { connectToSpreadsheet } from "react-google-sheet-connector"

import { TYPES, OFFERS_SHEET_NAME } from "../../utils/listingUtils"
import Listing from "../Listing"
import cs from "./styles.module.css"

const Listings =
  typeof window !== `undefined` &&
  connectToSpreadsheet(props => {
    const [typeFilter, setTypeFilter] = React.useState(TYPES[0])
    let filters = {}

    if (typeFilter !== TYPES[0]) {
      filters["typeOfSupport?"] = typeFilter
    }

    const listings = props
      .getSheet(OFFERS_SHEET_NAME)
      .getData()
      .filter(l => !!l["name:"])

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
                  setTypeFilter(filter)
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
  })

export default Listings
