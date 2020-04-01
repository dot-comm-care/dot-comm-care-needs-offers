import React from 'react';
import moment from 'moment';

import cs from './styles.module.css';

export default ({listing}) => {
  let hyperlink = "mailto:" + listing.emailAddress

  return (
    <article className={cs.listing}>
      <div className={cs.listingBody}>
        <div className={cs.title}>
          <div>
            <b>Need: {listing.type}</b>
            <div className={cs.date}>Posted on {moment(listing.timestamp).format('LL')}</div>
          </div>
        </div>
        <p>{listing.description}</p>
      </div>
      <div className={cs.actions}>
        <a
          className={cs.button}
          href={hyperlink}
        >Contact person</a>
      </div>
    </article>
  );
};
