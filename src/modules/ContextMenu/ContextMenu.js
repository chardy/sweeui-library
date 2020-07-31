import React, { useState, useRef, useEffect } from 'react'
import { classNames, classNameObject } from '../../utils/format'
import ModuleCSS from './ContextMenu.module.css'
import PropTypes from 'prop-types'
import Popover from '../Popover/Popover'

export default function ContextMenu({ children, trigger, selected, className, mode, position, onClick }) {
  const buttonRef = useRef(null)

  const [target, setTarget] = useState(null)
  const [active, setActive] = useState(false)

  let classes = {}
  if (mode === "gray") { classes["sui-gray"] = true }

  let styleAttrs = {}

  useEffect(() => {
    setTarget(buttonRef.current)
  }, [])

  function handleClick(value) {
    if (typeof onClick === 'function') {
      onClick(value)
    }
  }

  return (
    <>
      <span
        ref={buttonRef}
        className={classNames({
          ...classNameObject(className),
          ...classes,
          [ModuleCSS["ContextMenu"]]: true,
          "sui-ctx-menu-container": true,
          "sui-ctx-menu-active": active
        })}
      >
        {trigger}
        <Popover
          className={classNames({
            ...classNameObject(className),
            ...classes,
            "sui-ctx-menu": true
          })}
          target={target}
          position={position}
          noPadding={true}
          isMenuItem={true}
          onOpen={() => setActive(true)}
          onClose={() => setActive(false)}
        >
          {children.map((child, index) => (
            <div
              key={index}
              className={classNames({
                "sui-ctx-menu-item": true,
                "active": selected === child.props.value
              })}
              onClick={() => handleClick(child.props.value)}
            >
              {child.props.children}
            </div>
          ))}
        </Popover>
      </span>
    </>
  )
}

ContextMenu.propTypes = {
  onClick: PropTypes.func,
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  selected: PropTypes.string,
  mode: PropTypes.oneOf(["white", "gray"]),
  position: PropTypes.oneOf([
    "top-left", "top", "top-right",
    "right-top", "right", "right-bottom",
    "bottom-right", "bottom", "bottom-left",
    "left-bottom", "left", "left-top"
  ]),
};

ContextMenu.defaultProps = {
  className: "",
  mode: "white",
  position: "right-top",
  selected: null,
};
