import React, { useState, useEffect } from 'react'
import { classNames, classNameObject } from '../../utils/format'
import ModuleCSS from './FlexGallery.module.css'
import PropTypes from 'prop-types'
import { Flex } from 'sweeui'

function groupItems({ width, items, n, limit }) {
  if (n == 1) {
    return [
      { width: '100%', height: width / 1.6, childHeight: width / 1.6, nodes: [items[0]] }
    ]
  }

  if ((width / n) > 300) {
    const height = (width / n) / 1.6
    const containerHeight = Math.ceil(limit / n) * height

    return [...new Array(n)].map((_, x) => ({
      width: `${100 / n}%`, height: containerHeight, childHeight: height, nodes: items.filter((item, index) => index % 4 === x)
    }))
  } else {
    return groupItems({ width, items, n: n-1, limit })
  }
}

function FlexGallery({ className, children, width, gutter, focus, limit, rounded, more }) {
  const [containerWidth, setContainerWidth] = useState(width)

  useEffect(() => {
    setContainerWidth(width)
  }, [width])

  if (!children) return null

  let columns = [], display = limit
  const total = children.length
  const items = children.slice(0, limit || children.length)
  const length = items.length

  if (focus === "none") {
    columns = groupItems({ width: containerWidth, items, n: 4, limit })
  } else {
    if (length >= 5 && (containerWidth / 2) > 300) {
      const height = (containerWidth / 2) / 1.6
      columns = [
        { width: '50%', height: height, childHeight: height, nodes: [items[0]] },
        { width: '25%', height: height, childHeight: height / 2, nodes: [items[1], items[3]] },
        { width: '25%', height: height, childHeight: height / 2, nodes: [items[2], items[4]], last: true }
      ]
      display = 5

      if (focus === "center") {
        columns = [columns[1], columns[0], columns[2]]
      } else if (focus === "right") {
        columns = [columns[1], columns[2], columns[0]]
      }
    } else if (length >= 3 && (2 * containerWidth / 3) > 300) {
      const height = (2 * containerWidth / 3) / 1.6
      columns = [
        { width: '66.67%', height: height, childHeight: height, nodes: [items[0]] },
        { width: '33.33%', height: height, childHeight: height / 2, nodes: [items[1], items[2]], last: true }
      ]
      display = 3

      if (focus === "right") {
        columns = [columns[1], columns[0]]
      }
    } else {
      const height = containerWidth / 1.6
      columns = [
        { width: '100%', height: height, childHeight: height, nodes: [items[0]] }
      ]
      display = 1
    }
  }

  const moreOf = total - display + 1

  return (
    <div className={classNames({
      ...classNameObject(className),
      [ModuleCSS["FlexGallery"]]: true,
      "rounded": rounded,
      "more": more && display > 1 && (total - display) > 0,
    })}>
      <Flex width={`${containerWidth + gutter}px`} gutter={[gutter,0]}>
        {
          columns.map((column, index) => (
            <Flex key={index} wrap={1} width={column.width} height={column.height} gutter={[0,gutter]}>
              {
                !!column.nodes && column.nodes.map((node, nodeIndex) => (
                  <React.Fragment key={`${index}.${nodeIndex}`}>
                    <Flex
                      className={classNames({
                        "node-container": true,
                        "last-node": column.last && nodeIndex == column.nodes.length - 1
                      })}
                      direction="vertical"
                      width={'100%'}
                      height={column.childHeight}
                    >
                      {node}
                      {
                        more && moreOf > 1 && column.last && nodeIndex == column.nodes.length - 1 &&
                        <Flex className="show-more" align="middle" justify="center">
                          +{moreOf}
                        </Flex>
                      }
                    </Flex>
                  </React.Fragment>
                ))
              }
            </Flex>
          ))
        }
      </Flex>
    </div>
  )
}

export default FlexGallery

FlexGallery.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  gutter: PropTypes.number,
  limit: PropTypes.number,
  rounded: PropTypes.bool,
  more: PropTypes.bool,
  focus: PropTypes.oneOf(["left", "center", "right", "none"])
};

FlexGallery.defaultProps = {
  className: "",
  children: null,
  width: 1200,
  height: 500,
  gutter: 0,
  limit: null,
  rounded: false,
  more: false,
  focus: "none"
};
