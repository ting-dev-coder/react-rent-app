import React from 'react'
import styles from './index.module.scss'

const HOUSE_PACKAGE = [
  {
    id: 1,
    name: '衣柜',
    icon: 'icon-wardrobe'
  },
  {
    id: 2,
    name: '洗衣机',
    icon: 'icon-wash'
  },
  {
    id: 3,
    name: '空调',
    icon: 'icon-air'
  },
  {
    id: 4,
    name: '天然气',
    icon: 'icon-gas'
  },
  {
    id: 5,
    name: '冰箱',
    icon: 'icon-ref'
  },
  {
    id: 6,
    name: '暖气',
    icon: 'icon-Heat'
  },
  {
    id: 7,
    name: '电视',
    icon: 'icon-vid'
  },
  {
    id: 8,
    name: '热水器',
    icon: 'icon-heater'
  },
  {
    id: 9,
    name: '宽带',
    icon: 'icon-broadband'
  },
  {
    id: 10,
    name: '沙发',
    icon: 'icon-sofa'
  }
]

function HousePackage(props) {
  const { list } = props
  const RenderItems = () => {
    const arr = HOUSE_PACKAGE.filter(set => list.includes(set.name))
    return (
      arr.map((item, idx) => (
        <li
          className={[styles.item, styles.active].join(' ')}
          key={`package-${idx}`}
        >
          <p>
            <i className={`iconfont ${item.icon} ${styles.icon}`} />
          </p>
          {item.name}
        </li >
      ))
    )
  }
  return (
    < ul className={styles.root} >
      <RenderItems />
    </ul >
  )
}

export default HousePackage