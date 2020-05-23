import React, { useState } from 'react'
import { classNames, classNameObject } from '../../utils/format'
import { Flex, Button } from 'sweeui'
import ModuleCSS from './ReviewListing.module.css'
import PropTypes from 'prop-types'
import StarSvg from '../Icons/Star'

function ReviewListingItem({ id, reviewCount, title, message, authorInitial, authorName, reviewedAt }) {
  const [showAll, setShowAll] = useState(false)

  return (
    <Flex className="review-wrapper" direction="vertical" width={'33.33%'}>
      <div className={classNames({ "review-item": true, "expanded": showAll })}>
        <Flex className="star-rating" gutter={[4,0]}>
          {
            [...new Array(reviewCount || 4)].map((_, index) => (
              <StarSvg key={`${id}-${index}`} w={16} h={16} fill={"var(--star)"} stroke={"var(--star)"} strokeWidth={"30"} />
            ))
          }
        </Flex>
        <h3 className={classNames({ "line-clamp line-clamp-1": !showAll })}>
          {title}
        </h3>
        <p className={classNames({
          "line-clamp": !showAll
        })}>
          {message}
        </p>
        <Button type="link" className="more" onClick={() => setShowAll(!showAll)}>
          {showAll? 'Show less' : 'Show more'}
        </Button>
      </div>
      <Flex className="review-author" gutter={[24,0]}>
        <div className="avatar">{authorInitial}</div>
        <Flex className="author-info" direction="vertical" align="middle">
          <h4>{authorName}</h4>
          <p>{reviewedAt}</p>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default function ReviewListing({ className, title, description, items, limit }) {
  return (
    <div className={classNames({
      ...classNameObject(className),
      [ModuleCSS["ReviewListing"]]: true,
    })}>
      {!!title && <h2>{title}</h2>}
      {!!description && <p className="description">{description}</p>}
      {
        !!items && items.length > 0 &&
        <Flex className="review-list" wrap={1} gutter={[32,24]}>
          {
            items.slice(0, limit).map(item => (
              <ReviewListingItem
                key={item.id}
                id={item.id}
                reviewCount={item.reviewCount}
                title={item.title}
                message={item.message}
                authorInitial={item.authorInitial}
                authorName={item.authorName}
                reviewedAt={item.reviewedAt}
              />
            ))
          }
        </Flex>
      }
    </div>
  )
}

ReviewListing.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    reviewCount: PropTypes.number,
    authorInitial: PropTypes.string,
    authorName: PropTypes.string,
    reviewedAt: PropTypes.string
  })),
  limit: PropTypes.number,
};

ReviewListing.defaultProps = {
  className: "",
  title: null,
  description: null,
  items: null,
  limit: 6,
};
