import React from "react"
import queryString from "query-string"

import cs from "./styles.module.css"

function subjectFromType(type) {
  return `[${type}] - `
}

function getMailTo(email, subject, message) {
  return `mailto:${email}?${queryString.stringify({
    subject,
    body: message,
  })}`
}

export default function ListingActions({ contactMethod, type }) {
  const contactEmail = process.env.GATSBY_CONTACT_EMAIL
  const subject = subjectFromType(type)
  const message =
    "Dear MAMAS,\n\nI'm contacting you to find out how I can help meet the need for..."

  const mailto = getMailTo(contactEmail, subject, message)

  return (
    <div className={cs.actions}>
      <a href={mailto}>
        <button className={cs.button}>Meet Need</button>
      </a>
    </div>
  )
}
