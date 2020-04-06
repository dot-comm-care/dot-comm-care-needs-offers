import React from "react"
import moment from "moment"

import { NEED_TYPES } from "../../utils/listingUtils"
import cs from "./styles.module.css"

const FinancialNeedCard = ({
  frequency,
  timing,
  minFundingNeeded,
  maxFundingNeeded,
  fundingMethod,
}) => (
  <div>
    <table>
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
    </table>
  </div>
)

const cardNeedTypesMap = {
  [NEED_TYPES.FINANCIAL]: FinancialNeedCard,
}

export default ({ listing }) => {
  const { type, name, createdAt, contact, contactMethod, meta } = listing
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
        {/* FIXME: Not all users have provided email as contact method */}
        {contactMethod === "email" && (
          <a href={`mailto:${contact}`}>
            <button className={cs.button}>Meet Need</button>
          </a>
        )}
        {contactMethod === "phone" && (
          <a href={`tel:${contact}`}>
            <button className={cs.button}>Call {contact}</button>
          </a>
        )}
        {/* FIXME: what do we show if the user provided some contact method we don't expect? */}
      </div>
    </article>
  )
}
