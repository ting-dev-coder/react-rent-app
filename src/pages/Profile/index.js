import React, { useState } from 'react'
import { Grid } from 'antd-mobile'

function Profile() {
  const baseUrl = process.env.REACT_APP_URL,
    [menu] = useState([
      { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
      { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
      { id: 3, name: '看房紀錄', iconfont: 'icon-record' },
      { id: 4, name: '成為房主', iconfont: 'icon-identity' },
      { id: 5, name: '個人資料', iconfont: 'icon-myinfo' },
      { id: 6, name: '聯繫我們', iconfont: 'icon-cust' }
    ])
  const RenderCategoryGrid = () => {
    return (
      menu.map((item, index) => (
        <Grid.Item key={'grid' + index} className="grid-group-wrapper">
          <i className={`iconfont ${item.iconfont}`} />
          <h2 className='title'>{item.title}</h2>
        </Grid.Item>
      ))
    )
  }
  return (
    <>
      <img src="" alt="" className='background' />
      <section>
        <img src="" alt="" />
        <span></span>
        <button>去登錄</button>
      </section>
      <Grid columns={2} gap={8} className="group">
        {RenderCategoryGrid()}
      </Grid >
      <div className='banner'></div>
    </>
  )
}

export default Profile