import React, { useState, useMemo } from "react"
import { Link } from "gatsby"
import { connectToSpreadsheet } from "react-google-sheet-connector"
import classnames from "classnames"
import { useDebounce } from "use-debounce"

import { TYPES, OFFERS_SHEET_NAME } from "../../utils/listingUtils"
import useTextSearch from "../../utils/useTextSearch"
import ListingResults from "../ListingResults"
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
    const [debouncedSearchTerm] = useDebounce(searchTerm, 250)

    let filters = {}

    if (typeFilter !== TYPES[0]) {
      filters["typeOfSupport?"] = typeFilter
    }

    // FIXME: choose correct deps to update this memoized result
    // currently only updated once on initial render
    const listings = useMemo(() => {
      let keyIndex = 0
      return (
        props
          .getSheet(OFFERS_SHEET_NAME)
          .getData()
          .filter(l => !!l["name:"])
          // assign a stable unique key for each listing
          .map(l => ({ ...l, key: `listing-${keyIndex++}` }))
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            <input
              type="text"
              placeholder="Search"
              onChange={e => setSearchTerm(e.target.value)}
              className={classnames(cs.filter)}
            ></input>
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
          <ListingResults listings={searchResult} />
        </div>
      </div>
    )
  })

export default Listings
