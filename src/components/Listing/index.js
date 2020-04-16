import React from "react"
import moment from "moment"
import startCase from "lodash.startcase"

import { NEED_TYPES } from "../../utils/listingUtils"
import ListingActions from "./ListingActions"
import cs from "./styles.module.css"

const renderRow = (name, value) => {
  return (
    value && (
      <div className={cs.row} key={name}>
        <span className={cs.rowName}>{startCase(name)}:</span>
        <span className={cs.rowValue}>{value}</span>
      </div>
    )
  )
}

const FinancialContent = ({ minFundingNeed, maxFundingNeed, ...props }) => (
  <div className={cs.content}>
    {Object.keys(props).map((propKey) => renderRow(propKey, props[propKey]))}
    {(minFundingNeed || maxFundingNeed) &&
      renderRow("Funding Needed:", `$${minFundingNeed} - $${maxFundingNeed}`)}
  </div>
)

const DefaultContent = (props) => (
  <div className={cs.content}>
    {Object.keys(props).map((propKey) => renderRow(propKey, props[propKey]))}
  </div>
)

const Tag = ({ children }) => <span className={cs.tag}>{children}</span>

const componentTypeMap = {
  [NEED_TYPES.FINANCIAL]: FinancialContent,
}

export default ({ listing }) => {
  const { type, name, createdAt, contactMethod, meta } = listing

  // create separate need cards for various needs within the same row
  let ContentComponent = componentTypeMap[type] || DefaultContent

  return (
    <article className={cs.listing}>
      <div className={cs.title}>
        <div>
          <b>{name}</b>
          <div className={cs.date}>
            Posted on {moment(createdAt).format("LL")}
          </div>
          <Tag>{type}</Tag>
        </div>
      </div>
      <ContentComponent {...meta} />
      <ListingActions contactMethod={contactMethod} type={type} />
    </article>
  )
}
