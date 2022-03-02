import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Button } from 'antd-mobile'
import styles from './index.module.scss'
import { GetUser } from '../../api'


function Profile() {
  const baseUrl = process.env.REACT_APP_URL,
    navigate = useNavigate(),
    [isLogin, setLogin] = useState(false),
    [user, setUser] = useState({
      avatar: '',
      nickname: ''
    }),
    menu = [
      { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
      { id: 2, name: '我的出租', iconfont: 'icon-ind', to: '/rent' },
      { id: 3, name: '看房紀錄', iconfont: 'icon-record' },
      { id: 4, name: '成為房主', iconfont: 'icon-identity' },
      { id: 5, name: '個人資料', iconfont: 'icon-myinfo' },
      { id: 6, name: '聯繫我們', iconfont: 'icon-cust' }
    ]
  const getUserInfo = useCallback(() => {
    GetUser().then(res => {
      const { avatar, nickname } = res.data.body
      setUser({
        avatar: baseUrl + avatar,
        nickname
      })
    })
  }, [baseUrl])
  useEffect(() => {
    getUserInfo()
  }, [getUserInfo])

  const RenderCategoryGrid = () => {
    return (
      menu.map((item, index) => (
        <Grid.Item key={'grid' + index} className={styles.menuItem}>
          <i className={`iconfont ${item.iconfont}`} />
          <h2 className='title'>{item.name}</h2>
        </Grid.Item>
      ))
    )
  }
  const { avatar, nickname } = user
  const DEFAULT_AVATAR = baseUrl + '/img/profile/avatar.png'
  return (
    < div className={styles.root} >
      <section className={styles.title}>
        <img
          className={styles.bg}
          src={baseUrl + '/img/profile/bg.png'}
          alt="背景圖"
        />
        <div className={styles.info}>
          <div className={styles.myIcon}>
            <img
              className={styles.avatar}
              src={avatar || DEFAULT_AVATAR}
              alt="icon"
            />
          </div>
          <div className={styles.user}>
            <div className={styles.name}>{nickname || '遊客'}</div>
            {/* 登陸後顯示 */}
            {isLogin ? (
              <>
                <div className={styles.auth}>
                  <span onClick={this.logout}>退出</span>
                </div>
                <div className={styles.edit}>
                  編輯個人資料
                  <span className={styles.arrow}>
                    <i className="iconfont icon-arrow" />
                  </span>
                </div>
              </>
            ) : (
              <div className={styles.edit}>
                <Button
                  type="primary"
                  size="small"
                  inline
                  color='success'
                  onClick={() => navigate('/login')}
                >
                  去登錄
                </Button>
              </div>
            )}

            {/* 未登入展示 */}
          </div>
        </div>
      </section>
      {/* 九宮格菜單 */}
      <Grid columns={3} gap={0} className={styles.menuGroup}>
        {RenderCategoryGrid()}
      </Grid >
      {/* 加入我们 */}
      <div className={styles.ad}>
        <img src={baseUrl + '/img/profile/join.png'} alt="" />
      </div>
    </div >
  )
}

export default Profile