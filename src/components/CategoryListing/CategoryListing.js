import React, { useState } from 'react'
import { Flex, Button } from 'sweeui'
import { classNames, classNameObject } from '../../utils/format'
import PropTypes from 'prop-types'
import LinkItem from '../LinkItem/LinkItem'
import ModuleCSS from './CategoryListing.module.css'

function CategoryListing({ className, title, description, more, width, height, items, coverflow, limit, Link }) {
  const [current, setCurrent] = useState(limit)

  function handleFetchMore() {
    setCurrent(current + limit)
  }

  return (
    <div className={classNames({ ...classNameObject(className), [ModuleCSS["CategoryListing"]]: true })}>
      {!!title && <h2>{title}</h2>}
      {!!description && <div className="description" dangerouslySetInnerHTML={{ __html: description }} />}
      {
        !!items && items.length > 0 &&
        <Flex className={`${ModuleCSS["Wrapper"]} ${coverflow? 'coverflow' : 'normal'}`} wrap={1} gutter={[16,16]}>
          {
            items.slice(0, current).map(item => (
              <Flex className="card-wrapper" key={item.id} width={width}>
                <Flex
                  className="card-item"
                  width={'100%'}
                  height={height}
                  backgroundImage={item.background}
                  backgroundType={'cover'}
                >
                  <LinkItem Link={Link} url={item.url} nextUrl={item.nextUrl} fullWidth={true}>
                    <div className="card-box">
                      <h3>{item.title}</h3>
                    </div>
                  </LinkItem>
                </Flex>
              </Flex>
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

export default CategoryListing

CategoryListing.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  more: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
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
    })
  })),
  coverflow: PropTypes.bool,
  limit: PropTypes.number,
  Link: PropTypes.func
};

CategoryListing.defaultProps = {
  className: null,
  title: null,
  description: null,
  more: null,
  width: "33%",
  height: 200,
  items: null,
  coverflow: true,
  limit: 6,
  Link: null,
};
