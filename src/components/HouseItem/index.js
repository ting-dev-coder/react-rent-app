import React from 'react'
import PropTypes from 'prop-types'
import { Tag } from 'antd-mobile'

import styles from './index.module.scss'

function HouseItem(props) {
  const { tags, title, desc, src, price, handlerClick } = props
  const RenderTags = () => {
    return (
      tags.map((tag, idx) => (
        <Tag color='default' key={`tag-${idx}`}>
          {tag}
        </Tag>
      ))
    )
  }
  return (
    <li className={styles.root} onClick={handlerClick}>
      <div className="img-wrap">
        <img src={src} alt="" />
      </div>
      <div className='content'>
        <h3 className='title'>{title}</h3>
        <p className='desc'>{desc}</p>
        <div>
          <RenderTags />
        </div>
        <p className='price'>
          <span className='priceNum'>{price}</span> 元/月
        </p>
      </div>
    </li>
  )
}
// HouseItem.propTypes = {
//   src: PropTypes.string,
//   title: PropTypes.string,
//   desc: PropTypes.string,
//   tags: PropTypes.array.isRequired,
//   price: PropTypes.number,
//   onClick: PropTypes.func
// }

export default HouseItem