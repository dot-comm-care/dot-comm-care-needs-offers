import React, { useMemo, useReducer } from "react"
import { Link } from "gatsby"
import { connectToSpreadsheet } from "react-google-sheet-connector"
import classnames from "classnames"

import {
  NEEDS_SHEET_NAME,
  NEED_TYPES,
  NEEDS_SHEET_COLUMN_INDICES,
} from "../../utils/listingUtils"
import useFilteredListings from "../../utils/useFilteredListings"
import ListingResults from "../ListingResults"
import cs from "./styles.module.css"

/**
 * A reducer which parses a row from the sheet and adds the needs data to the array of all needs
 * TODO: implement all types and parse metadata for each card
 * @param {*} result
 * @param {*} row
 * @param {*} index
 */
function parseRow(result, row, index) {
  const sharedCardProps = {
    id: `listing-${index}`,
    type: NEED_TYPES.FINANCIAL,
    name: row[NEEDS_SHEET_COLUMN_INDICES.name] || "Anonymous",
    createdAt: row[NEEDS_SHEET_COLUMN_INDICES.createdAt],
    contactMethod: row[
      NEEDS_SHEET_COLUMN_INDICES.preferredContactMethod
    ]?.toLowerCase(),
    contact: row[NEEDS_SHEET_COLUMN_INDICES.contact],
  }

  if (row[NEEDS_SHEET_COLUMN_INDICES.isFinancialNeed]) {
    const parsedFinancialMetadata = {
      // any data parsed out of the row that is needed by the financial card
      frequency: row[NEEDS_SHEET_COLUMN_INDICES.financial_needFrequency],
      timing: row[NEEDS_SHEET_COLUMN_INDICES.financial_needTiming],
      minfundingNeeded:
        row[NEEDS_SHEET_COLUMN_INDICES.financial_minFundingNeed],
      maxFundingNeeded:
        row[NEEDS_SHEET_COLUMN_INDICES.financial_maxFundingNeed],
      fundingMethod: row[NEEDS_SHEET_COLUMN_INDICES.financial_fundingMethod],
    }

    result.push({
      meta: parsedFinancialMetadata,
      ...sharedCardProps,
    })
  }

  return result
}

function filterReducer(state, action) {
  switch (action.type) {
    case "setTypeFilter":
      return { ...state, typeFilter: action.value }
    case "setSearchTerm":
      return { ...state, searchTerm: action.value }
    // other filters
    default:
      throw new Error(`invalid action type ${action.type}`)
  }
}

const Listings =
  typeof window !== `undefined` &&
  connectToSpreadsheet(props => {
    const [filters, dispatch] = useReducer(filterReducer, {
      typeFilter: null,
      searchTerm: "",
    })

    // FIXME: choose correct deps to update this memoized result
    // currently only updated once on initial render
    const listings = useMemo(() => {
      return props
        .getSheet(NEEDS_SHEET_NAME)
        .getData()
        .reduce(parseRow, [])
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const filteredListings = useFilteredListings(filters, listings)

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
              onChange={e =>
                dispatch({ type: "setSearchTerm", value: e.target.value })
              }
              className={classnames(cs.filter)}
            ></input>
            {Object.values(NEED_TYPES).map(filter => (
              <button
                key={filter}
                className={classnames(cs.filter, {
                  [cs.selectedFilter]: filter === filters.typeFilter,
                  [cs.notSelectedFilter]: filter !== filters.typeFilter,
                })}
                onClick={() => {
                  dispatch({ type: "setTypeFilter", value: filter })
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <ListingResults listings={filteredListings} />
      </div>
    )
  })

export default Listings
