import React from 'react'
import { Flex, Button } from 'sweeui'
import ModuleCSS from './ArticleListing.module.css'
import PropTypes from 'prop-types'
import LinkItem from '../LinkItem/LinkItem'

export default function ArticleListing({ title, description, height, items, limit, more, handleMore, Link }) {
  function handleShowAll() {
    if (typeof handleMore === 'function') {
      handleMore()
    }
  }

  return (
    <div className={ModuleCSS["ArticleListing"]}>
      {!!title && <h2>{title}</h2>}
      {!!description && <p className="description">{description}</p>}
      {
        !!items && items.length > 0 &&
        <Flex wrap={1} gutter={[40,16]}>
          {
            items.slice(0, limit).map(item => (
              <Flex className="card-wrapper" key={item.id} width={'33.33%'}>
                <LinkItem Link={Link} url={item.url} nextUrl={item.nextUrl} fullWidth={true}>
                  <Flex
                    className="card-item"
                    width={'100%'}
                    direction={"vertical"}
                  >
                    <Flex
                      className="card-photo"
                      width={'100%'}
                      height={height}
                      backgroundImage={item.background}
                      backgroundType={'cover'}
                    />
                    <h3 className="line-clamp line-clamp-2">{item.title}</h3>
                  </Flex>
                </LinkItem>
              </Flex>
            ))
          }
        </Flex>
      }
      {
        typeof handleMore === 'function' &&
        <Button className="more" type="link" onClick={handleShowAll}>{more} &rsaquo;</Button>
      }
    </div>
  )
}

ArticleListing.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  more: PropTypes.string,
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
    }),
  })),
  limit: PropTypes.number,
  handleMore: PropTypes.func,
  Link: PropTypes.func,
};

ArticleListing.defaultProps = {
  title: null,
  description: null,
  more: null,
  height: 200,
  items: null,
  limit: 6,
  handleMore: null,
  Link: null,
};
