import React, { useState, useEffect } from 'react'
import { Grid } from 'antd-mobile'
import './index.scss'
import Swiper from '../../components/Swiper'
import { GetSwiper, GetGroup, GetNews } from '../../api'

import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

function Home(props) {
  const [swipers, setSwiper] = useState([]),
    baseUrl = process.env.REACT_APP_URL,
    [news, setNews] = useState([]),
    [groups, setGroups] = useState([]),
    [items] = useState([
      {
        id: 1,
        img: Nav1,
        title: '整租',
        path: '/home/list'
      },
      {
        id: 2,
        img: Nav2,
        title: '合租',
        path: '/home/list'
      },
      {
        id: 3,
        img: Nav3,
        title: '地图找房',
        path: '/map'
      },
      {
        id: 4,
        img: Nav4,
        title: '去出租',
        path: '/rent/add'
      }
    ])
  const getSwiper = () => {
    GetSwiper().then(response => {
      const res = response.data
      if (res.status !== 200) return
      setSwiper(swipers => [...res.body])
    }).catch(err => console.log(err))
  }
  const getGroup = () => {
    GetGroup({
      area: 'AREA%7C88cff55c-aaa4-e2e0'
    }).then(response => {
      const { body } = response.data
      setGroups(groups => [...body])
    })
  }
  const getNews = () => {
    GetNews({
      area: 'AREA%7C88cff55c-aaa4-e2e0'
    }).then(response => {
      const { body } = response.data
      setNews(news => [...body])
    })
  }
  useEffect(() => {
    getSwiper()
    getGroup()
    getNews()
  }, [])
  const RenderShortcutGird = () => {
    return (
      items.map((item, index) => (
        <Grid.Item key={'grid' + index} className="grid-item-wrapper">
          <img src={item.img} alt="" />
          <h2>{item.title}</h2>
        </Grid.Item>
      ))
    )
  }
  const RenderGroupGrid = () => {
    return (
      groups.map((item, index) => (
        <Grid.Item key={'grid' + index} className="grid-group-wrapper">
          <div className="group-item">
            <h2 className='title'>{item.title}</h2>
            <p className='desc'>{item.desc}</p>
          </div>
          <img src={baseUrl + item.imgSrc} alt="" />
        </Grid.Item>
      ))
    )
  }
  const RenderNews = () => {
    return (
      news.map(info => (
        <li key={info.id} className="news-item">
          <img src={baseUrl + info.imgSrc} alt="" />
          <div className="content">
            <h3 className='title'>
              {info.title}
            </h3>
            <div className='info'>
              <span>{info.from}</span>
              <span>{info.date}</span>
            </div>
          </div>
        </li>
      ))
    )
  }
  return (
    <>
      {/* 輪播 */}
      <div className="swiper">
        <Swiper swipers={swipers} className="swiper" />
      </div>
      {/* 快捷導航 */}
      <Grid columns={4} gap={8} className="shortCut">
        {RenderShortcutGird()}
      </Grid >
      {/* 租房小組 */}
      <section className="group-container">
        <h3 className='group-title'>
          租房小組
          <span>更多</span>
        </h3>
        <Grid columns={2} gap={8} className="group">
          {RenderGroupGrid()}
        </Grid >
      </section>
      {/* 最新資訊 */}
      <section className="news">
        <h3 className='group-title'>最新資訊</h3>
        <ul>
          {RenderNews()}
        </ul>
      </section>
    </>
  )
}

export default Home