import React from 'react'
import { classNames, classNameObject } from '../../utils/format'
import { Flex } from 'sweeui'
import ModuleCSS from './DetailedInfo.module.css'
import PropTypes from 'prop-types'

function DetailedInfoItem({ width, icon, label, value, divider, iconWidth }) {
  if (divider) {
    return (
      <Flex className="info-divider" />
    )
  }

  return (
    !!value &&
    <Flex className="info-item" width={width || '100%'} gutter={[8,0]} align="middle">
      <Flex className="info-icon" width={iconWidth} justify="center">{icon}</Flex>
      {!!label && <div className="info-label">{label}</div>}
      {!!value && <div className="info-value">{value}</div>}
    </Flex>
  )
}

export default function DetailedInfo({ className, items, transform, iconWidth }) {
  return (
    <div className={classNames({
      ...classNameObject(className),
      [ModuleCSS["DetailedInfo"]]: true,
      "capitalize": transform === 'capitalize'
    })}>
      {
        !!items && items.length > 0 &&
        <Flex className="info-list" wrap={1} gutter={[32,4]}>
          {
            items.map((item, index) => (
              item &&
              <DetailedInfoItem
                key={index}
                width={item.width}
                icon={item.icon}
                iconWidth={iconWidth}
                label={item.label}
                value={item.value}
                divider={item.divider}
              />
            ))
          }
        </Flex>
      }
    </div>
  )
}

DetailedInfo.propTypes = {
  className: PropTypes.string,
  iconWidth: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    width: PropTypes.string,
    icon: PropTypes.node,
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ]),
    divider: PropTypes.bool,
    transform: PropTypes.string,
  }))
};

DetailedInfo.defaultProps = {
  className: "",
  iconWidth: '30px',
  items: null,
  transform: 'none'
};
