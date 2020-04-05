import React from "react"
import moment from "moment"

import { NEEDS_SHEET_COLUMN_INDICES } from "../../utils/listingUtils"
import cs from "./styles.module.css"

const FinancialNeedCard = listing => (
  <div>
    <table>
      <tr>
        <td>Frequency:</td>
        <td>{listing[NEEDS_SHEET_COLUMN_INDICES.financial_needFrequency]}</td>
      </tr>
      <tr>
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
      </tr>
    </table>
  </div>
)

export default ({ listing }) => {
  // create separate need cards for various needs within the same row
  let needCards = []
  if (listing[NEEDS_SHEET_COLUMN_INDICES.isFinancialNeed]) {
    needCards.push(FinancialNeedCard)
  }

  return needCards.map(renderer => (
    <article className={cs.listing}>
      <div className={cs.title}>
        <div>
          <b>{listing[NEEDS_SHEET_COLUMN_INDICES.name] || "Anonymous"}</b>
          <div className={cs.date}>
            Posted on{" "}
            {moment(listing[NEEDS_SHEET_COLUMN_INDICES.createdAt]).format("LL")}
          </div>
        </div>
      </div>
      <div className={cs.listingBody}>{renderer(listing)}</div>
      <div className={cs.actions}>
        <a href={`mailto:${listing.emailAddress}`}>
          <button className={cs.button}>Meet Need</button>
        </a>
      </div>
    </article>
  ))
}
