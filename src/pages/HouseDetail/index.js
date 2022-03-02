import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Grid } from 'antd-mobile'
import styles from './index.module.scss'
import { GetHouseDetail } from '../../api'
import HouseItem from '../../components/HouseItem'
import Tags from '../../components/Tags'
import Swiper from '../../components/Swiper'
import HousePackage from '../../components/HousePackage'
import GoogleMap from '../../components/GoogleMap'


function HouseDetail(props) {
  const location = useLocation(),
    baseUrl = process.env.REACT_APP_URL,
    params = location.state,
    navigate = useNavigate(),
    [swipers, setSwipers] = useState([]),
    [isFavorite, setFavorite] = useState(false),
    [house, setHouse] = useState({
      community: '',
      coord: {
        latitude: 0,
        longitude: 0
      },
      description: '',
      floor: '',
      houseCode: '',
      houseImg: [],
      oriented: [],
      price: 0,
      roomType: '',
      size: 0,
      supporting: [],
      tags: [],
      title: ''
    })
  // 猜你喜欢
  const recommendHouses = [
    {
      id: 1,
      src: baseUrl + '/img/message/1.png',
      desc: '72.32㎡/南 北/低楼层',
      title: '安贞西里 3室1厅',
      price: 4500,
      tags: ['随时看房']
    },
    {
      id: 2,
      src: baseUrl + '/img/message/2.png',
      desc: '83㎡/南/高楼层',
      title: '天居园 2室1厅',
      price: 7200,
      tags: ['近地铁']
    },
    {
      id: 3,
      src: baseUrl + '/img/message/3.png',
      desc: '52㎡/西南/低楼层',
      title: '角门甲4号院 1室1厅',
      price: 4300,
      tags: ['集中供暖']
    }
  ]
  useEffect(() => {
    getHouseDetail()
  }, [])
  const getHouseDetail = () => {
    const id = params.id
    GetHouseDetail(id).then(response => {

      const res = response.data
      if (res.status !== 200) return
      console.log(res.body)
      setHouse(house => { return { ...res.body } })
      mapSwiperSrc(res.body.houseImg)
    }).catch(err => {
      console.log(err)
    })
  }
  const mapSwiperSrc = (imgs) => {
    const arr = []
    imgs.forEach(img => {
      arr.push({
        imgSrc: img
      })
    })
    setSwipers(swiper => [...arr])
  }
  const RenderHouseType = () => {
    const obj = [
      {
        label: '裝修',
        val: '精裝'
      },
      {
        label: '朝向',
        val: house.oriented.join('、')
      },
      {
        label: '樓層',
        val: house.floor
      },
      {
        label: '類型',
        val: '普通住宅'
      }
    ]
    return (
      obj.map((type, idx) => (
        <Grid.Item key={`type-${idx}`}>
          <span className="title">{type.label}:</span>
          {type.val}
        </Grid.Item>
      ))
    )
  }
  const RenderFooterBtns = () => {
    const btns = [
      {
        title: '收藏',
        className: '',
        icon: baseUrl + (isFavorite ? '/img/star.png' : '/img/unstar.png')
      },
      {
        title: '再線諮詢',
        className: ''
      },
      {
        title: '電話諮詢',
        className: 'telephone'
      },

    ]
    return (
      btns.map((btn, idx) => (
        <button className={btn.className} key={`footerbtn-${idx}`}>
          {
            btn.icon && <img src={btn.icon} alt="收藏" />
          }
          {btn.title}
        </button>
      ))
    )
  }
  const navToDetail = (id) => {
    navigate('/nav/house-detail', { state: { id: id } })
  }
  return (
    <div className={styles.root}>
      {/* 輪播 */}
      <div className="swiper">
        <Swiper swipers={swipers} className="swiper" />
      </div>

      <div className={styles.info}>
        <h3 className="infoTitle">
          {house.title}
        </h3>
        <div className="tags">
          <Tags tags={house.tags} />
        </div>

        {/* 房屋價錢相關資訊 */}
        <Grid columns={3} gap={8} className={styles.infoPrice}>
          <Grid.Item className="infoPriceItem">
            <div>
              {house.price}
              <span>/月</span>
            </div>
            <span>租金</span>
          </Grid.Item>
          <Grid.Item className="infoPriceItem">
            <div>
              <span>{house.roomType}</span></div>
            <span>房型</span>
          </Grid.Item>
          <Grid.Item className="infoPriceItem">
            <div>
              <span>{house.size}平米</span></div>
            <span>面積</span>
          </Grid.Item>
        </Grid >

        {/* 房屋基本資訊 */}
        <Grid columns={2} gap={8} className={styles.infoBasic}>
          <RenderHouseType />
        </Grid >
      </div>
      {/* googleMap */}
      <section className={styles.map}>
        <div className="mapTitle">
          小區：
          <span>{house.community}</span>
        </div>
        <div className='mapContainer'>
          <GoogleMap
            text={house.community}
            center={{
              lat: parseFloat(house.coord.latitude),
              lng: parseFloat(house.coord.longitude)
            }}
          />
        </div>

      </section>

      {/* 房屋配件 */}
      <section className={styles.about}>
        <h3 className="houseTitle">房屋配件</h3>
        {house.supporting.length === 0 ? (
          <div className="titleEmpty">暫無數據</div>
        ) : (
          <HousePackage list={house.supporting} />
        )}
      </section>

      {/* 屋主訊息 */}
      <section className={styles.set}>
        <div>
          <h3 className="houseTitle">房源概况</h3>
          <div className={styles.owner}>
            <img src={baseUrl + '/img/avatar.png'} alt="头像" />
            <div className="useInfo">
              <h5>王女士</h5>
              <div className="userAuth">
                <i className="iconfont icon-auth" />
                已認證房主
              </div>
            </div>
            <button className="userMsg">發消息</button>
          </div>
        </div>
        <p className="descText">
          {house.description || '暂无房屋描述'}
        </p>
      </section>

      {/* 推荐 */}
      <section className={styles.recommend}>
        <div className="houseTitle">猜你喜欢</div>
        <div className="items">
          {recommendHouses.map(house => (
            <HouseItem
              handlerClick={() => { navToDetail(house.houseCode) }}
              {...house}
              key={house.id}
            />
          ))}
        </div>
      </section>

      {/* 底部 */}
      <footer className={styles.fixedBottom}>
        <RenderFooterBtns />
      </footer>
    </div>
  )
}

export default HouseDetail