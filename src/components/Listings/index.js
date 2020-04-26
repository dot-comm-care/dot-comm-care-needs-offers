import React, { useMemo, useReducer } from "react"
import { Link } from "gatsby"
import { connectToSpreadsheet } from "react-google-sheet-connector"
import classnames from "classnames"

import {
  NEEDS_OFFERS_SHEET_NAME,
  FILTER_TYPES,
  NEEDS_SHEET_COLUMN_INDICES,
} from "../../utils/listingUtils"
import useFilteredListings from "../../utils/useFilteredListings"
import ListingResults from "../ListingResults"
import cs from "./styles.module.css"
import moment from "moment"

function parseName(name) {
  if (!name) {
    return "Anonymous"
  }

  const [first, ...rest] = name.trim().split(" ")
  const restInitials = rest.map(n => `${n[0].toUpperCase()}.`)
  return `${first} ${restInitials}`
}

function mapMeta(keys, row) {
  return {
    ...Object.keys(keys).reduce(
      (curr, key) => ({
        ...curr,
        [key]: row[keys[key]],
      }),
      {}
    ),
  }
}

function makeCard(type, index, row, sharedCardProps, result) {
  if (row[NEEDS_SHEET_COLUMN_INDICES[type].id] === "Yes") {
    result.push({
      ...sharedCardProps,
      id: `listing-${index}-${type}`,
      type,
      meta: mapMeta(NEEDS_SHEET_COLUMN_INDICES[type].meta, row),
    })
  }
}

/**
 * A reducer which parses a row from the sheet and adds the needs data to the array of all needs
 * TODO: implement all types and parse metadata for each card
 * @param {*} result
 * @param {*} row
 * @param {*} index
 */
function parseRow(result, row, index) {
  result.push({
    id: `listing-${index}`,
    name: row[NEEDS_SHEET_COLUMN_INDICES.name],
    contact: row[NEEDS_SHEET_COLUMN_INDICES.contact],
    offers: row[NEEDS_SHEET_COLUMN_INDICES.offer] === undefined ? [] : row[NEEDS_SHEET_COLUMN_INDICES.offer].split(', '),
    offerDetails: row[NEEDS_SHEET_COLUMN_INDICES.offerDetails],
    needs: row[NEEDS_SHEET_COLUMN_INDICES.need] === undefined ? [] : row[NEEDS_SHEET_COLUMN_INDICES.need].split(', '),
    needDetails: row[NEEDS_SHEET_COLUMN_INDICES.needDetails]
  })

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
      const result = props.getSheet(NEEDS_OFFERS_SHEET_NAME).getData()
      return result
        .reduce(parseRow, [])
        //.sort((a, b) => b.createdAt.diff(a.createdAt)) // sort newest -> oldest
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const filteredListings = useFilteredListings(filters, listings)

    return (
      <div>
        <div className={cs.actionContainer}>
          <div className={cs.sidebar}>
            <Link to="/new">
              <button className={cs.newRequestBtn}>New Request</button>
            </Link>
            <input
              className={cs.searchBox}
              type="text"
              placeholder="Search"
              onChange={e =>
                dispatch({ type: "setSearchTerm", value: e.target.value })
              }
            ></input>
          </div>
          <div className={cs.filters}>
            {Object.values(FILTER_TYPES).map(filter => (
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
