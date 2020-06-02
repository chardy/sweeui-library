import React, { useState, useRef, useEffect } from 'react'
import { classNames, classNameObject } from '../../utils/format'
import ModuleCSS from './Popover.module.css'
import PropTypes from 'prop-types'
import { Flex, Button } from 'sweeui'

export default function Popover({ target, children, className, header, display, position, noPadding }) {
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
    } else {
      document.body.classList.remove('sui-popover-open')
    }
  }, [visible])
  
  useEffect(() => {
    const dim = !!target && target.getBoundingClientRect()
    const currentDim = !!currentRef && !!currentRef.current && currentRef.current.getBoundingClientRect()

    if (!!dim && !!currentDim) {
      setDimension(dim)

      if (position === "top-left") { setPositionAttrs ({ top: dim.top - currentDim.height - 2.5, right: 'auto', bottom: 'auto', left: dim.left }) }
      else if (position === "top") { setPositionAttrs ({ top: dim.top - currentDim.height - 2.5, right: 'auto', bottom: 'auto', left: dim.left + 0.5 * (dim.right - dim.left) - 0.5 * currentDim.width }) }
      else if (position === "top-right") { setPositionAttrs ({ top: dim.top - currentDim.height - 2.5, right: 'auto', bottom: 'auto', left: dim.right - currentDim.width }) }
      else if (position === "right-top") { setPositionAttrs ({ top: dim.top, right: 'auto', bottom: 'auto', left: dim.right + 2.5 }) }
      else if (position === "right") { setPositionAttrs ({ top: dim.top + 0.5 * (dim.bottom - dim.top) - 0.5 * currentDim.height, right: 'auto', bottom: 'auto', left: dim.right + 2.5 }) }
      else if (position === "right-bottom") { setPositionAttrs ({ top: dim.bottom - currentDim.height, right: 'auto', bottom: 'auto', left: dim.right + 2.5 }) }
      else if (position === "bottom-right") { setPositionAttrs ({ top: dim.bottom + 2.5, right: 'auto', bottom: 'auto', left: dim.right - currentDim.width }) }
      else if (position === "bottom") { setPositionAttrs ({ top: dim.bottom + 2.5, right: 'auto', bottom: 'auto', left: dim.left + 0.5 * (dim.right - dim.left) - 0.5 * currentDim.width }) }
      else if (position === "bottom-left") { setPositionAttrs ({ top: dim.bottom + 2.5, right: 'auto', bottom: 'auto', left: dim.left }) }
      else if (position === "left-bottom") { setPositionAttrs ({ top: dim.bottom - currentDim.height, right: 'auto', bottom: 'auto', left: dim.left - currentDim.width - 2.5 }) }
      else if (position === "left") { setPositionAttrs ({ top: dim.top + 0.5 * (dim.bottom - dim.top) - 0.5 * currentDim.height, right: 'auto', bottom: 'auto', left: dim.left - currentDim.width - 2.5 }) }
      else if (position === "left-top") { setPositionAttrs ({ top: dim.top, right: 'auto', bottom: 'auto', left: dim.left - currentDim.width - 2.5 }) }
    }
  }, [target, currentRef, visible])

  let classes = {}

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
          "no-padding": noPadding,
        })}
        style={{
          top: dimension.top,
          height: dimension.height,
          left: dimension.left,
          width: dimension.width
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
  noPadding: PropTypes.bool,
};

Popover.defaultProps = {
  target: null,
  className: "",
  position: null,
  header: null,
  noPadding: false
};
