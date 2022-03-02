import React, { useEffect } from 'react'
import styles from './index.module.scss'

function Tags(props) {
  const { tags } = props
  const RenderTag = () => {
    console.log(tags)
    if (tags.length === 0) {
      console.log('hhhh')
      return (
        <span >
          sdfds
        </span>
      )
    }
    // 如果标签数量超过3个，后面的标签就都展示位第三个标签的样式

  }
  return (
    <>
      <div className={styles.root}>
        {
          tags.map((tag, idx) => (
            <span
              key={`tag-${idx}`}
              className={`tag ${idx > 2 ? 'tag3' : `tag${idx + 1}`}`}>
              {tag}
            </span>
          ))
        }
      </div>

    </>
  )
}
export default Tags