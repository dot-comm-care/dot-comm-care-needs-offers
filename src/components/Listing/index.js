import React from "react"
import moment from "moment"
import startCase from "lodash.startcase"

import { FILTER_TYPES } from "../../utils/listingUtils"
import ListingActions from "./ListingActions"
import cs from "./styles.module.css"

const renderNeedsOffers = (name, value) => {
  if (value.length === 0) return
  return (
    value && (
      <div className={cs.row} key={name}>
        <span className={cs.rowName}>{startCase(name)}:</span>
        <span className={cs.rowValue}>
        {value.map((item, key) => (
          <span key={key}>{item}&#44;&nbsp;</span>
        ))}
        </span>
      </div>
    )
  )
}

const renderRow = (name, value) => {
  if (name === 'needs' || name === 'offers') {
    return renderNeedsOffers(name, value)
  } else {
    return (
      value && (
        <div className={cs.row} key={name}>
          <span className={cs.rowName}>{startCase(name)}:</span>
          <span className={cs.rowValue}>{value}</span>
        </div>
      )
    )
  }
}

const DefaultContent = (props) => (
  <div className={cs.content}>
    {Object.keys(props).map((propKey) => renderRow(propKey, props[propKey]))}
  </div>
)

const Tag = ({ children }) => <span className={cs.tag}>{children}</span>

export default ({ listing }) => {
  // create separate need cards for various needs within the same row

  return (
    <article className={cs.listing}>
      <div className={cs.title}>
        <div>
          <b>{listing.name}</b>
        </div>
      </div>
      <DefaultContent {...listing} />
      <ListingActions contactMethod={listing.contact} />
    </article>
  )
}
