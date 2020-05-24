import React, { useState, useEffect } from 'react'
import { classNames, classNameObject } from '../../utils/format'
import ModuleCSS from './Modal.module.css'
import PropTypes from 'prop-types'
import { Flex, Button } from 'sweeui'

export default function Modal({ children, className, visible, header, onClose }) {
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

  return (
    <>
      <div
        className={classNames({
          ...classNameObject(className),
          [ModuleCSS["Modal"]]: true
        })}
        onClick={() => setOutsideClick(true)}
      >
        <Flex
          className="modal-container"
          direction="vertical"
          onClick={() => setInsideClick(true)}
        >
          <Flex className="modal-header" align="middle" gutter={[16,0]}>
            <Flex className="header" grow={1}>
              <h3 className="line-clamp line-clamp-1">{header}</h3>
            </Flex>
            <Flex className="close">
              <Button type="ghost" onClick={onClose}>&times;</Button>
            </Flex>
          </Flex>
          <Flex className="modal-body" grow={1}>
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
  header: PropTypes.string,
};

Modal.defaultProps = {
  onClose: null,
  className: "",
  visible: false,
  header: null
};
