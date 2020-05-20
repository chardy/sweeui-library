import React from 'react'
import PropTypes from 'prop-types'
import ModuleCSS from './LinkItem.module.css'
import { classNames } from '../../utils/format'

function LinkItem({ Link, children, url, nextUrl, fullWidth }) {
  if (!!nextUrl && !!Link) {
    return (
      <Link {...nextUrl}>
        <a className={classNames({ [ModuleCSS["Link"]]: true, "full": fullWidth })}>
          {children}
        </a>
      </Link>
    )
  }

  if (!!url && !!Link) {
    return (
      <Link href={url}>
        <a className={classNames({ [ModuleCSS["Link"]]: true, "full": fullWidth })}>
          {children}
        </a>
      </Link>
    )
  }
  
  if (!!url) {
    return (
      <a className={classNames({ [ModuleCSS["Link"]]: true, "full": fullWidth })}>
        {children}
      </a>
    )
  }

  return children
}

export default LinkItem

LinkItem.propTypes = {
  children: PropTypes.node.isRequired,
  Link: PropTypes.func,
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
  fullWidth: PropTypes.bool
}

LinkItem.defaultProps = {
  Link: null,
  url: null,
  nextUrl: null,
  fullWidth: false,
}
