import React from 'react';
import moment from 'moment';

import cs from './styles.module.css';

export default ({listing}) => {
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
        <div className={cs.location}>
          <img src={require('./pin.svg')} className={cs.locationPin} alt="Location pin icon" />
          {listing.location}
        </div>
        <button onClick={() => {}}>Meet need</button>
      </div>
    </article>
  );
};
