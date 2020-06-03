import React, { useState, useRef, useEffect } from 'react'
import { classNames, classNameObject } from '../../utils/format'
import { Button, Flex } from 'sweeui'
import ModuleCSS from './ConfirmButton.module.css'
import PropTypes from 'prop-types'
import Popover from '../Popover/Popover'

export default function ConfirmButton({ children, trigger, className, mode, position, confirmText, cancelText, onCancel, onConfirm }) {
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
    <>
      <span
        ref={confirmButtonRef}
        className={classNames({
          ...classNameObject(className),
          ...classes,
          [ModuleCSS["ConfirmButton"]]: true,
          "sui-confirm-container": true,
          "sui-confirm-active": active
        })}
      >
        {trigger}
        <Popover
          className={classNames({
            ...classNameObject(className),
            ...classes,
            "sui-confirm": true
          })}
          target={target}
          position={position}
          onOpen={() => setActive(true)}
          onClose={() => setActive(false)}
        >
          {children}
          <Flex className="sui-confirm-btn-group" gutter={[8,0]} justify="end">
            {!!onCancel && !!cancelText && <Flex><Button onClick={handleCancel}>{cancelText}</Button></Flex>}
            {!!onConfirm && !!confirmText && <Flex><Button type="primary" onClick={handleConfirm}>{confirmText}</Button></Flex>}
          </Flex>
        </Popover>
      </span>
    </>
  )
}

ConfirmButton.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  mode: PropTypes.oneOf(["white", "gray"]),
  position: PropTypes.oneOf([
    "top-left", "top", "top-right",
    "right-top", "right", "right-bottom",
    "bottom-right", "bottom", "bottom-left",
    "left-bottom", "left", "left-top"
  ]),
};

ConfirmButton.defaultProps = {
  className: "",
  mode: "white",
  position: "right-top",
  confirmText: 'Yes',
  cancelText: 'No',
  onConfirm: null,
  onCancel: null
};
