import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { TabBar } from 'antd-mobile'

// 導入樣式文件
import './index.scss'

const Home = (path) => {
  const navigate = useNavigate();
  const [activeKey] = useState('home'),
    [tabs] = useState([
      {
        key: 'home',
        title: '首页',
        icon: 'icon-ind',
        path: '/home'
      },
      {
        key: 'findHouse',
        title: '找房',
        icon: 'icon-findHouse',
        path: '/houses'
      },
      {
        key: 'infom',
        title: '资讯',
        icon: 'icon-infom',
        path: '/news'
      },
      {
        key: 'my',
        title: '我的',
        icon: 'icon-my',
        path: '/profile'
      }
    ]


    )
  const setRouteActive = (key) => {
    const activeTab = tabs.findIndex(tab => tab.key === key)
    navigate(tabs[activeTab].path)
  }
  return (
    <div className='app'>
      <div className="view">
        <Outlet />
      </div>
      <footer>
        <TabBar
          activeKey={activeKey}
          className="nav"
          onChange={setRouteActive}
        >
          {tabs.map((item, key) => (
            <TabBar.Item key={item.key} title={item.title} icon={<RenderIcon item={item} />} />
          ))}
        </TabBar>
      </footer>
    </div>)
}

function RenderIcon(props) {
  const { item } = props
  return (
    <i className={'iconfont ' + item.icon} />
  )
}

export default Home