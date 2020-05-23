import React, { useState } from 'react'
import { classNames, classNameObject } from '../../utils/format'
import { Flex, Button } from 'sweeui'
import ModuleCSS from './ProductListing.module.css'
import PropTypes from 'prop-types'
import LinkItem from '../LinkItem/LinkItem'

import StarSvg from '../Icons/Star'

export default function ProductListing({
  className, title, description, more, width, height, items, limit, collapsible,
  handleTrigger, handleEventTrigger, Link
}) {
  const [current, setCurrent] = useState(limit)
  const [collapsed, setCollapsed] = useState(false)

  function handleToggleCollapse() {
    if (collapsible) {
      setCollapsed(!collapsed)
    }
  }

  function handleFetchMore() {
    setCurrent(current + limit)
  }

  return (
    <div className={classNames({
      ...classNameObject(className),
      [ModuleCSS["ProductListing"]]: true,
      "collapsible": collapsible,
      "collapsed": collapsed,
      "expanded": !collapsed,
      "with-title": !!title && title.length > 0
    })}>
      {!!title && <h2 className="text-title" onClick={handleToggleCollapse}>{title}</h2>}
      {!!description && <p className="description">{description}</p>}
      {
        !!items && items.length > 0 &&
        <Flex className={ModuleCSS["Wrapper"]} wrap={1} gutter={[16,16]}>
          {
            items.slice(0, current).map((item, index) => (
              <React.Fragment key={item.id}>
                {typeof handleTrigger === 'function' && handleTrigger(item)}
                <Flex className="product-wrapper" key={item.id} width={width}>
                  <LinkItem Link={Link} url={item.url} nextUrl={item.nextUrl} fullWidth={true}>
                    <Flex
                      className="product-item"
                      width={'100%'}
                      direction="vertical"
                      position="relative"
                      onClick={() => handleEventTrigger({ ...item, index })}
                    >
                      <Flex
                        className="product-photo"
                        width={'100%'}
                        height={height}
                        backgroundImage={item.background}
                        backgroundType={'cover'}
                      >
                        <div className="card-box">
                          {!!item.duration && item.duration}
                        </div> 
                      </Flex>
                      <Flex
                        className="product-details"
                        height={140}
                        direction="vertical"
                        align="space-between"
                      >
                        <div>
                          {!!item.location && <p className="location">{item.location}</p>}
                          <h3 className="line-clamp">{item.name}</h3>
                          {
                            !!item.review && !!item.review.count &&
                            <Flex className="rating" align="middle">
                              <span>{item.review.average} <StarSvg w={12} h={12} fill={"var(--star)"} stroke={"var(--star)"} strokeWidth={"30"} /></span>
                              (<b>{item.review.count}</b> reviews)
                            </Flex>
                          }
                        </div>
                        {item.price}
                      </Flex>
                    </Flex>
                  </LinkItem>
                </Flex>
              </React.Fragment>
            ))
          }
        </Flex>
      }
      {
        items.length > current &&
        <Button className="more" type="link" onClick={handleFetchMore}>{more} &or;</Button>
      }
    </div>
  )
}

ProductListing.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  more: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    code: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    subtype: PropTypes.string,
    location: PropTypes.string,
    duration: PropTypes.string,
    background: PropTypes.string,
    url: PropTypes.string,
    nextUrl: PropTypes.shape({
      href: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          pathname: PropTypes.string,
          query: PropTypes.shape({
            slug: PropTypes.string
          })
        })
      ]),
      alias: PropTypes.string
    }),
    price: PropTypes.node,
    review: PropTypes.shape({
      average: PropTypes.number,
      count: PropTypes.number
    })
  })),
  limit: PropTypes.number,
  collapsible: PropTypes.bool,
  handleTrigger: PropTypes.func,
  handleEventTrigger: PropTypes.func,
  Link: PropTypes.func
};

ProductListing.defaultProps = {
  className: "",
  title: null,
  description: null,
  more: null,
  width: "33%",
  height: 200,
  items: null,
  limit: 6,
  collapsible: false,
  handleTrigger: null,
  handleEventTrigger: null,
  Link: null,
};
