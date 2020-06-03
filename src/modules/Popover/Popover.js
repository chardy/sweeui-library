import React, { useState, useRef, useEffect } from 'react'
import { classNames, classNameObject } from '../../utils/format'
import ModuleCSS from './Popover.module.css'
import PropTypes from 'prop-types'
import { Flex, Button } from 'sweeui'

export default function Popover({ target, children, className, mode, header, display, position, noPadding, onOpen, onClose }) {
  const currentRef = useRef(null)
  const [outsideClick, setOutsideClick] = useState(false)
  const [insideClick, setInsideClick] = useState(false)
  const [visible, setVisible] = useState(false)
  const [dimension, setDimension] = useState({})
  const [positionAttrs, setPositionAttrs] = useState({})

  function handleSetOutside() {
    setOutsideClick(true)
  }

  function handleSetInside(ev) {
    setInsideClick(true)
  }

  useEffect(() => {
    document.addEventListener('click', handleSetOutside)
    return function cleanup() {
      document.removeEventListener('click', handleSetOutside)
    }
  }, [])

  useEffect(() => {
    if (outsideClick && !insideClick) {
      setVisible(false)
      setOutsideClick(false)
      setInsideClick(false)
    } else if (outsideClick && insideClick) {
      setVisible(true)
      setOutsideClick(false)
      setInsideClick(false)
    }
  }, [outsideClick, insideClick])

  useEffect(() => {
    if (visible) {
      document.body.classList.add('sui-popover-open')
      if (typeof onOpen === 'function') {
        onOpen()
      }
    } else {
      document.body.classList.remove('sui-popover-open')
      if (typeof onClose === 'function') {
        onClose()
      }
    }
  }, [visible])
  
  useEffect(() => {
    const dim = !!target && target.getBoundingClientRect()
    const currentDim = !!currentRef && !!currentRef.current && currentRef.current.getBoundingClientRect()

    if (!!dim && !!currentDim) {
      setDimension(dim)

      if (position === "top-left") { setPositionAttrs ({ top: 'auto', right: 'auto', bottom: dim.height + 7.5, left: 0 }) }
      else if (position === "top") { setPositionAttrs ({ top: 'auto', right: 'auto', bottom: dim.height + 7.5, left: 0.5 * dim.width - 0.5 * currentDim.width }) }
      else if (position === "top-right") { setPositionAttrs ({ top: 'auto', right: 0, bottom: dim.height + 7.5, left: 'auto' }) }
      else if (position === "right-top") { setPositionAttrs ({ top: 0, right: 'auto', bottom: 'auto', left: dim.width + 7.5 }) }
      else if (position === "right") { setPositionAttrs ({ top: 0.5 * dim.height - 0.5 * currentDim.height, right: 'auto', bottom: 'auto', left: dim.width + 7.5 }) }
      else if (position === "right-bottom") { setPositionAttrs ({ top: 'auto', right: 'auto', bottom: 0, left: dim.width + 7.5 }) }
      else if (position === "bottom-right") { setPositionAttrs ({ top: dim.height + 7.5, right: 'auto', bottom: 'auto', left: dim.width - currentDim.width }) }
      else if (position === "bottom") { setPositionAttrs ({ top: dim.height + 7.5, right: 'auto', bottom: 'auto', left: + 0.5 * dim.width - 0.5 * currentDim.width }) }
      else if (position === "bottom-left") { setPositionAttrs ({ top: dim.height + 7.5, right: 'auto', bottom: 'auto', left: 0 }) }
      else if (position === "left-bottom") { setPositionAttrs ({ top: 'auto', right: dim.width + 7.5, bottom: 0, left: 'auto' }) }
      else if (position === "left") { setPositionAttrs ({ top: 0.5 * dim.height - 0.5 * currentDim.height, right: dim.width + 7.5, bottom: 'auto', left: 'auto' }) }
      else if (position === "left-top") { setPositionAttrs ({ top: 0, right: dim.width + 7.5, bottom: 'auto', left: 'auto' }) }
    }
  }, [target, currentRef, visible])

  let classes = {}
  if (noPadding) { classes["no-padding"] = true }
  if (mode === "gray") { classes["sui-gray"] = true }

  if ([
    "top-left", "top", "top-right",
    "right-top", "right", "right-bottom",
    "bottom-right", "bottom", "bottom-left",
    "left-bottom", "left", "left-top"
  ].includes(position)) {
    classes[`sui-popover-${position}`] = true
  }

  let styleAttrs = {}

  styleAttrs = { ...styleAttrs, ...positionAttrs }

  return (
    <>
      <div
        className={classNames({
          ...classNameObject(className),
          ...classes,
          [ModuleCSS["Popover"]]: true,
        })}
        style={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
        onClick={() => !visible && handleSetInside()}
      >
        <div
          className={classNames({
            "sui-popover-container": true,
            "sui-popover-hidden": !visible
          })}
          ref={currentRef}
          style={styleAttrs}
          onClick={handleSetInside}
        >
          {children}
        </div>
      </div>
    </>
  )
}

Popover.propTypes = {
  target: PropTypes.instanceOf(Element).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  position: PropTypes.oneOf([
    "top-left", "top", "top-right",
    "right-top", "right", "right-bottom",
    "bottom-right", "bottom", "bottom-left",
    "left-bottom", "left", "left-top"
  ]),
  header: PropTypes.string,
  mode: PropTypes.oneOf(["white", "gray"]),
  noPadding: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
};

Popover.defaultProps = {
  target: null,
  className: "",
  position: "right-top",
  header: null,
  mode: "white",
  noPadding: false,
  onOpen: null,
  onClose: null
};
