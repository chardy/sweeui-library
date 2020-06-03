import React, { useState, useRef, useEffect } from 'react'
import { classNames, classNameObject } from '../../utils/format'
import ModuleCSS from './PopoverWrapper.module.css'
import PropTypes from 'prop-types'
import Popover from '../Popover/Popover'

export default function PopoverWrapper({ children, trigger, className, mode, position }) {
  const confirmButtonRef = useRef(null)
  const currentRef = useRef(null)

  const [target, setTarget] = useState(null)
  const [active, setActive] = useState(false)

  let classes = {}
  if (mode === "gray") { classes["sui-gray"] = true }

  let styleAttrs = {}

  useEffect(() => {
    setTarget(confirmButtonRef.current)
  }, [])

  function handleConfirm() {
    if (typeof onConfirm === 'function') {
      onConfirm()
    }
  }

  function handleCancel() {
    if (typeof onCancel === 'function') {
      onCancel()
    }
  }

  return (
    <div
      ref={confirmButtonRef}
      className={classNames({
        ...classNameObject(className),
        ...classes,
        [ModuleCSS["PopoverWrapper"]]: true,
        "sui-popover-wrapper-container": true,
        "sui-popover-wrapper-active": active
      })}
    >
      {trigger}
      <Popover
        className={classNames({
          ...classNameObject(className),
          ...classes,
          "sui-popover-wrapper": true
        })}
        target={target}
        position={position}
        onOpen={() => setActive(true)}
        onClose={() => setActive(false)}
      >
        {children}
      </Popover>
    </div>
  )
}

PopoverWrapper.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  mode: PropTypes.oneOf(["white", "gray"]),
  position: PropTypes.oneOf([
    "top-left", "top", "top-right",
    "right-top", "right", "right-bottom",
    "bottom-right", "bottom", "bottom-left",
    "left-bottom", "left", "left-top"
  ]),
};

PopoverWrapper.defaultProps = {
  className: "",
  mode: "white",
  position: "right-top",
};
