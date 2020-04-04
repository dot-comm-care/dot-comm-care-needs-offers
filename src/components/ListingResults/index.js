import React from "react"

import Listing from "../Listing"
import cs from "./styles.module.css"

function ListingResults({ listings }) {
  return (
    <div className={cs.listings}>
      {listings.map(listing => (
        <Listing key={listing.key} listing={listing}></Listing>
      ))}
    </div>
  )
}

export default React.memo(ListingResults)
