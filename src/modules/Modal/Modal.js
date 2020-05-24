import React, { useState, useEffect } from 'react'
import { classNames, classNameObject } from '../../utils/format'
import ModuleCSS from './Modal.module.css'
import PropTypes from 'prop-types'
import { Flex, Button } from 'sweeui'

export default function Modal({ children, className, visible, header, type, containerType, onClose }) {
  const [outsideClick, setOutsideClick] = useState(false)
  const [insideClick, setInsideClick] = useState(false)

  useEffect(() => {
    if (outsideClick && !insideClick) {
      onClose()
    }

    if (outsideClick) {
      setOutsideClick(false)
      setInsideClick(false)
    }
  }, [outsideClick, insideClick])

  if (!visible) return false

  let classes = {}
  if (["medium", "large", "full", "tall"].includes(type)) { classes[`sui-modal-${type}`] = true }
  if (["transparent"].includes(containerType)) { classes[`sui-modal-${containerType}`] = true }

  return (
    <>
      <div
        className={classNames({
          ...classNameObject(className),
          ...classes,
          [ModuleCSS["Modal"]]: true
        })}
        onClick={() => setOutsideClick(true)}
      >
        <Flex
          className="sui-modal-container"
          direction="vertical"
          onClick={() => setInsideClick(true)}
        >
          <Flex className="sui-modal-header" align="middle" gutter={[16,0]}>
            <Flex className="sui-header" grow={1}>
              <h3 className="line-clamp line-clamp-1">{header}</h3>
            </Flex>
            <Flex className="sui-close">
              <Button type="ghost" onClick={onClose}>&times;</Button>
            </Flex>
          </Flex>
          <Flex className="sui-modal-body" grow={1}>
            <div>
              {children}
            </div>
          </Flex>
        </Flex>
      </div>
    </>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
  visible: PropTypes.bool,
  type: PropTypes.oneOf(["default", "medium", "large", "full", "tall"]),
  containerType: PropTypes.oneOf(["default", "transparent"]),
  header: PropTypes.string,
};

Modal.defaultProps = {
  onClose: null,
  className: "",
  visible: false,
  type: "default",
  containerType: "default",
  header: null
};
