import React, { useState, useEffect, useRef } from 'react'
import { Flex } from 'sweeui'
import PropTypes from 'prop-types'
import ModuleCSS from './SplashImage.module.css'

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

function SplashImage({ title, description, height, items, handleClick }) {
  const [current, setCurrent] = useState(0)

  if (!items || items.length <= 0) return false

  const length = items.length

  useInterval(() => {
    setCurrent((current + 1) % length)
  }, 5000)

  return (
    <div className={ModuleCSS["SplashImage"]}>
      <Flex className="splash-container" direction="vertical" height={height}>
        {
          items.map((item, index) => (
            ((current-1 + length) % length == index || current == index || (current+1) % length == index) &&
            <Flex
              className={`${index == current? '' : 'image-hidden'} ${item.redirect? 'pointer' : ''}`}
              key={item.id}
              height={height}
              align={"bottom"}
              direction={"vertical"}
              backgroundImage={item.background}
              backgroundType={"cover"}
              onClick={handleClick.bind(this, item.redirect)}
            >
              {!item.title && !!title && <h1>{title}</h1>}
              {!!item.title && <h2>{item.title}</h2>}
              {(!!item.description || !!description) && <p>{item.description || description}</p>}
            </Flex>
          ))
        }
      </Flex>
      <Flex height={height} />
    </div>
  )
}

export default SplashImage

SplashImage.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  height: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    background: PropTypes.string,
    redirect: PropTypes.string
  })),
  handleClick: PropTypes.func,
};

SplashImage.defaultProps = {
  title: null,
  description: null,
  height: 433,
  items: null
};
