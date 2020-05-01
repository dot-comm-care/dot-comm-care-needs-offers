import { useMemo } from "react"
import { useDebounce } from "use-debounce"

import useTextSearch from "./useTextSearch"
const FULL_TEXT_SEARCH_KEYS = [
  "name",
  "contact",
  "needs",
  "needDetails",
  "offerDetails",
  "offers",
]

/**
 * Return true if a listing has the same type as the value of typeFilter
 * or the typeFilter is not set. False otherwise.
 * @param {*} filters
 * @param {*} listing
 */
const filterByType = (filters, listing) =>
  !filters.typeFilter || listing.type === filters.typeFilter

/**
 * TODO: implement date filter
 * @param  {...any} filters
 * @param {*} listing
 */
const filterByDate = (filters, listing) => true

/**
 * Curried function which takes one or more filter functions as arguments
 * and composes them into one filter function which returns true if all
 * filter functions return true and false otherwise.
 * @param  {...any} filterFuncs
 */
const composeFilters = (...filterFuncs) => (filters) => (listing) =>
  filterFuncs.reduce(
    (result, filterFunc) => result && filterFunc(filters, listing),
    true
  )

const createListingsFilter = composeFilters(filterByType, filterByDate)

export default function useFilteredListings(filters, listings) {
  const listingsFilter = useMemo(() => createListingsFilter(filters), [filters])
  const filteredListings = useMemo(() => listings.filter(listingsFilter), [
    listings,
    listingsFilter,
  ])
  const [debouncedSearchTerm] = useDebounce(filters.searchTerm, 250)

  const searchResult = useTextSearch(
    filteredListings,
    FULL_TEXT_SEARCH_KEYS,
    debouncedSearchTerm
  )
  return searchResult
}
