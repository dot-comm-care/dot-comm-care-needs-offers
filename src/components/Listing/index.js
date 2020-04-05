import React from "react"
import moment from "moment"

import { NEED_TYPES } from "../../utils/listingUtils"
import cs from "./styles.module.css"

const FinancialNeedCard = ({ needFrequency }) => (
  <div>
    <table>
      <tr>
        <td>Frequency:</td>
        <td>{needFrequency}</td>
      </tr>
      {/* <tr>
        <td>Timing:</td>
        <td>{listing[NEEDS_SHEET_COLUMN_INDICES.financial_needTiming]}</td>
      </tr>
      <tr>
        <td>Funding Needed:</td>
        <td>
          ${listing[NEEDS_SHEET_COLUMN_INDICES.financial_minFundingNeed]} - $
          {listing[NEEDS_SHEET_COLUMN_INDICES.financial_maxFundingNeed]}
        </td>
      </tr>
      <tr>
        <td>Preferred Method(s):</td>
        <td>{listing[NEEDS_SHEET_COLUMN_INDICES.financial_fundingMethod]}</td>
      </tr> */}
    </table>
  </div>
)

const cardNeedTypesMap = {
  [NEED_TYPES.FINANCIAL]: FinancialNeedCard,
}

export default ({ type, name, createdAt, email, meta }) => {
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
        <Card meta={meta} />
      </div>
      <div className={cs.actions}>
        <a href={`mailto:${email}`}>
          <button className={cs.button}>Meet Need</button>
        </a>
      </div>
    </article>
  )
}
