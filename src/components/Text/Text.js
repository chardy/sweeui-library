import React, { useState } from 'react'
import { classNames, classNameObject } from "../../utils/format"
import ModuleCSS from './Text.module.css'
import PropTypes from 'prop-types'

function Text({ className, title, content, collapsible }) {
  const [collapsed, setCollapsed] = useState(false)

  function handleToggleCollapse() {
    if (collapsible) {
      setCollapsed(!collapsed)
    }
  }

  return (
    <div className={classNames({
      ...classNameObject(className),
      [ModuleCSS["Text"]]: true,
      "collapsible": collapsible,
      "collapsed": collapsed,
      "expanded": !collapsed,
      "with-title": !!title && title.length > 0
    })}>
      {
        !!title &&
        <h2 className="text-title" onClick={handleToggleCollapse}>
          {title}
        </h2>
      }
      {!!content && <div className="text-content" dangerouslySetInnerHTML={{ __html: content }} />}
    </div>
  )
}

export default Text

Text.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  collapsible: PropTypes.bool,
  handleClick: PropTypes.func,
};

Text.defaultProps = {
  className: "",
  title: null,
  content: null,
  collapsible: false,
  handleClick: null,
};
