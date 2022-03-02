import React from 'react'
import { Swiper } from 'antd-mobile'

function SwiperTop(props) {
  const { swipers } = props,
    baseUrl = process.env.REACT_APP_URL

  const renderItem = () => {
    return (
      swipers.map((swiper, index) => (
        <Swiper.Item key={`swiper-${index}`}>
          <img style={{ 'width': '100%' }} src={baseUrl + swiper.imgSrc} alt="" />
        </Swiper.Item>
      ))
    )
  }
  return (
    <>
      <Swiper autoplay defaultIndex={0} style={{ '--height': '100%' }}>
        {renderItem()}
      </Swiper>
    </>
  )
}

export default SwiperTop