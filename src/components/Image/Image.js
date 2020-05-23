import React, { useState, useEffect, useRef } from 'react'
import ModuleCSS from './Image.module.css'
import PropTypes from 'prop-types'
import { classNames } from '../../utils/format'
import { Flex } from 'sweeui'

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

function ImageView({ children, LazyLoader }) {
  if (!!LazyLoader) {
    return (
      <LazyLoader>{children}</LazyLoader>
    )
  }

  return children
}

function Image({ title, description, height, items, collapsible, handleClick, LazyLoader }) {
  const [current, setCurrent] = useState(0)

  if (!items || items.length <= 0) return false

  const caption = items[current].caption
  const length = items.length

  useInterval(() => {
    setCurrent((current + 1) % length)
  }, 5000)

  return (
    <div className={classNames({
      [ModuleCSS["Image"]]: true,
      "collapsible": collapsible
    })}>
      {!!title && <h2>{title}</h2>}
      {!!description && <p className="description">{description}</p>}
      <Flex className="image-container" direction="vertical" position="relative" height={height}>
        {
          items.map((item, index) => (
            ((current-1 + length) % length == index || current == index || (current+1) % length == index) &&
            <ImageView
              key={item.id}
              LazyLoader={LazyLoader}
            >
              <img
                className={`${index == current? '' : 'image-hidden'} ${item.redirect? 'pointer' : ''}`}
                height={height}
                src={item.background}
                onClick={handleClick.bind(this, item.redirect)}
              />
            </ImageView>
          ))
        }
      </Flex>
      {!!caption && <p className="photo-caption">&#9650; {caption}</p>}
    </div>
  )
}

export default Image

Image.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  height: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    background: PropTypes.string,
    redirect: PropTypes.string,
    caption: PropTypes.string,
  })),
  collapsible: PropTypes.bool,
  handleClick: PropTypes.func,
  LazyLoader: PropTypes.func,
};

Image.defaultProps = {
  title: null,
  description: null,
  height: 433,
  items: null,
  collapsible: false,
  LazyLoader: null,
};
