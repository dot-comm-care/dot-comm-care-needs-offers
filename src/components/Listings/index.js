import React, { useState } from "react"
import { Link } from "gatsby"
import { connectToSpreadsheet } from "react-google-sheet-connector"
import classnames from "classnames"
import { useDebounce } from "use-debounce"

import { TYPES, OFFERS_SHEET_NAME } from "../../utils/listingUtils"
import useTextSearch from "../../utils/useTextSearch"
import Listing from "../Listing"
import cs from "./styles.module.css"

const FULL_TEXT_SEARCH_KEYS = [
  "name:",
  "pleaseCheckOffWhatYouCanOffer:",
  "areThereAnySuppliesOrFoodThatYouCouldContributeToACommunalPool?PleaseBeSpecificInQuantity",
]

const Listings =
  typeof window !== `undefined` &&
  connectToSpreadsheet(props => {
    const [typeFilter, setTypeFilter] = useState(TYPES[0])
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearchTerm] = useDebounce(searchTerm, 1000)

    let filters = {}

    if (typeFilter !== TYPES[0]) {
      filters["typeOfSupport?"] = typeFilter
    }

    const listings = props
      .getSheet(OFFERS_SHEET_NAME)
      .getData()
      .filter(l => !!l["name:"])

    const searchResult = useTextSearch(
      listings,
      FULL_TEXT_SEARCH_KEYS,
      debouncedSearchTerm
    )

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
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            ></input>
          </div>
        </div>
        <div className={cs.listings}>
          {searchResult.map((listing, i) => (
            // FIXME: come up with unique key for listing
            <Listing key={i} listing={listing}></Listing>
          ))}
        </div>
      </div>
    )
  })

export default Listings
