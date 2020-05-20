import React from 'react'
import ModuleCSS from './VideoListing.module.css'
import PropTypes from 'prop-types'
import { Flex } from 'sweeui'

function VideoListing({ title, description, height, width, items, limit, coverflow, handleClick }) {
  if (!items || items && items.length <= 0) return null

  function handleOpenVideo(videoCode) {
    if (typeof handleClick === 'function') {
      handleClick(true, videoCode)
    }
  }

  return (
    <section className={ModuleCSS["VideoListing"]}>
      <h2>{title}</h2>
      <p>{description}</p>
      <Flex className={`${ModuleCSS["Wrapper"]} ${coverflow? 'coverflow' : 'normal'}`} wrap={1} gutter={[16,0]}>
        {items.slice(0, limit? parseInt(limit) : items.length).map((video, index) => {
          return (
            <Flex
              key={video.id}
              className="video-container"
              width={width}
              direction="vertical"
              onClick={() => handleOpenVideo(video.videoCode)}
            >
              <Flex
                className="video-item"
                align="middle"
                justify="center"
                position="relative"
                backgroundImage={video.background}
                backgroundType="cover"
                height={height}
              >
                <span className="video-play">&#9654;</span>
              </Flex>
              <h3 className="video-title">{video.title}</h3>
              <p className="call-to-action">Click to play video</p>
            </Flex>
          );
        })}
      </Flex>
    </section>
  )
}

export default VideoListing

VideoListing.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    background: PropTypes.string,
    videoCode: PropTypes.string
  })),
  coverflow: PropTypes.bool,
  limit: PropTypes.number
};

VideoListing.defaultProps = {
  title: null,
  description: null,
  height: 200,
  width: '33.33%',
  items: null,
  coverflow: false,
  limit: 6,
};
