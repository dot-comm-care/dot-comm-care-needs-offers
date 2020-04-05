import React, { useState, useMemo, useCallback } from "react"
import { Link } from "gatsby"
import { connectToSpreadsheet } from "react-google-sheet-connector"
import classnames from "classnames"
import { useDebounce } from "use-debounce"

import { NEEDS_SHEET_NAME } from "../../utils/listingUtils"
import useTextSearch from "../../utils/useTextSearch"
import ListingResults from "../ListingResults"
import cs from "./styles.module.css"
import {
  NEEDS_SHEET_COLUMN_INDICES,
  NEED_TYPES,
} from "../../utils/listingUtils"

const FULL_TEXT_SEARCH_KEYS = ["name"]

/**
 * A reducer which parses a row from the sheet and adds the needs data to the array of all needs
 * TODO: implement all types and parse metadata for each card
 * @param {*} result
 * @param {*} row
 * @param {*} index
 */
function parseRow(result, row, index) {
  const rowNeeds = []
  if (row[NEEDS_SHEET_COLUMN_INDICES.isFinancialNeed]) {
    const parsedFinancialMetadata = {
      // any data parsed out of the row that is needed by the financial card
      needFrequency: row[NEEDS_SHEET_COLUMN_INDICES.financial_needFrequency],
    }

    rowNeeds.push({
      id: `listing-${index}-financial`,
      type: NEED_TYPES.FINANCIAL,
      meta: parsedFinancialMetadata,
      name: row[NEEDS_SHEET_COLUMN_INDICES.name] || "Anonymous",
      createdAt: row[NEEDS_SHEET_COLUMN_INDICES.createdAt],
      email: "test@gmail.com",
    })
  }

  result.push(...rowNeeds)
  return result
}

/**
 * Stub implementation. Returns a filter function which filters needs.
 * TODO: implement filtering
 * @param {*} needs
 * @param {*} filters
 */
function createListingsFilter(filters) {
  return listings => listings
}

const Listings =
  typeof window !== `undefined` &&
  connectToSpreadsheet(props => {
    const [typeFilter, setTypeFilter] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearchTerm] = useDebounce(searchTerm, 250)

    let filters = {}

    // if (typeFilter !== TYPES[0]) {
    //   filters["typeOfSupport?"] = typeFilter
    // }

    // FIXME: choose correct deps to update this memoized result
    // currently only updated once on initial render
    const listingsFilter = useCallback(() => createListingsFilter(filters), [
      filters,
    ])

    const listings = useMemo(() => {
      return props
        .getSheet(NEEDS_SHEET_NAME)
        .getData()
        .reduce(parseRow, [])
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const filteredListings = useMemo(() => listings.filter(listingsFilter), [
      listings,
      listingsFilter,
    ])

    const searchResult = useTextSearch(
      filteredListings,
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
            {/* {TYPES.map(filter => (
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
            ))} */}
          </div>
        </div>
        <ListingResults listings={searchResult} />
      </div>
    )
  })

export default Listings
