import React from "react"
import moment from "moment"

import cs from "./styles.module.css"

export default ({ listing }) => {
  return (
    <article className={cs.listing}>
      <div className={cs.listingBody}>
        <div className={cs.title}>
          <div>
            <b>{listing["name:"]}</b>
            <div className={cs.date}>
              Posted on {moment(listing.timestamp).format("LL")}
            </div>
          </div>
        </div>
        <p>
          <b>Offer:</b> {listing["pleaseCheckOffWhatYouCanOffer:"]}
        </p>
        <p>
          <b>Supplies/food:</b>{" "}
          {
            listing[
              "areThereAnySuppliesOrFoodThatYouCouldContributeToACommunalPool?PleaseBeSpecificInQuantity"
            ]
          }
        </p>
      </div>
      <div className={cs.actions}>
        <a href={`mailto:${listing.emailAddress}`}>
          <button className={cs.button}>Contact person</button>
        </a>
      </div>
    </article>
  )
}
