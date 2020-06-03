import React, { useState } from 'react'
import { classNames, classNameObject } from '../../utils/format'
import { Flex, Button } from 'sweeui'
import ModuleCSS from './LogoListing.module.css'
import PropTypes from 'prop-types'

function LogoListingItem({ id, height, imageUrl, imageDescription, redirectUrl }) {
  const [showAll, setShowAll] = useState(false)

  return (
    <Flex className="logo-wrapper" height={height} align="middle">
      <a href={redirectUrl} target="_blank">
        <img title={imageDescription} alt={imageDescription} src={imageUrl} />
      </a>
    </Flex>
  )
}

export default function LogoListing({ className, title, description, height, items, limit }) {
  return (
    <div className={classNames({
      ...classNameObject(className),
      [ModuleCSS["LogoListing"]]: true,
    })}>
      {!!title && <h2>{title}</h2>}
      {!!description && <p className="description">{description}</p>}
      {
        !!items && items.length > 0 &&
        <Flex className="logo-list" wrap={1} justify="center" gutter={[40,24]}>
          {
            items.slice(0, limit).map(item => (
              <LogoListingItem
                key={item.id}
                id={item.id}
                height={height}
                imageUrl={item.imageUrl}
                imageDescription={item.imageDescription}
              />
            ))
          }
        </Flex>
      }
    </div>
  )
}

LogoListing.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    imageDescription: PropTypes.string,
    redirectUrl: PropTypes.string
  })),
  height: PropTypes.number,
  limit: PropTypes.number,
};

LogoListing.defaultProps = {
  className: "",
  title: null,
  description: null,
  items: null,
  height: 120,
  limit: 6,
};
