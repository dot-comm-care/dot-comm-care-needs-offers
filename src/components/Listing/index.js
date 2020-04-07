import React from "react"
import moment from "moment"

import { NEED_TYPES } from "../../utils/listingUtils"
import ListingActions from "./ListingActions"
import cs from "./styles.module.css"

const FinancialNeedCard = ({
  frequency,
  timing,
  minFundingNeeded,
  maxFundingNeeded,
  fundingMethod,
}) => (
  <table>
    <tbody>
      <tr>
        <td>Frequency:</td>
        <td>{frequency}</td>
      </tr>
      <tr>
        <td>Timing:</td>
        <td>{timing}</td>
      </tr>
      <tr>
        <td>Funding Needed:</td>
        <td>
          ${minFundingNeeded} - ${maxFundingNeeded}
        </td>
      </tr>
      <tr>
        <td>Preferred Method(s):</td>
        <td>{fundingMethod}</td>
      </tr>
    </tbody>
  </table>
)

const SuppliesNeedCard = ({
  frequency,
  timing,
  details,
  neighborhood,
  store,
  shoppingList,
}) => (
  <table>
    <tbody>
      <tr>
        <td>Frequency:</td>
        <td>{frequency}</td>
      </tr>
      <tr>
        <td>Timing:</td>
        <td>{timing}</td>
      </tr>
      <tr>
        <td>Neighborhood:</td>
        <td>{neighborhood || "N/A"}</td>
      </tr>
      <tr>
        <td>Store:</td>
        <td>{store || "N/A"}</td>
      </tr>
      {details && (
        <tr>
          <td>Details:</td>
          <td>{details}</td>
        </tr>
      )}
      <tr>
        <td>Shopping List:</td>
        <td>{shoppingList || "N/A"}</td>
      </tr>
    </tbody>
  </table>
)

const cardNeedTypesMap = {
  [NEED_TYPES.FINANCIAL]: FinancialNeedCard,
  [NEED_TYPES.SUPPLIES]: SuppliesNeedCard,
}

export default ({ listing }) => {
  const { type, name, createdAt, contactMethod, meta } = listing

  console.log(type)

  // create separate need cards for various needs within the same row
  let Card = cardNeedTypesMap[type]
  if (!Card) {
    throw new Error(`Unsupported need type ${type}`)
  }

  return (
    <article className={cs.listing}>
      <div className={cs.title}>
        <div>
          <b>{name}</b>
          <div className={cs.date}>
            Posted on {moment(createdAt).format("LL")}
          </div>
        </div>
      </div>
      <div className={cs.listingBody}>
        <Card {...meta} />
      </div>
      <ListingActions contactMethod={contactMethod} type={type} />
    </article>
  )
}
