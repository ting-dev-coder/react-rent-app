import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  List,
  AutoSizer,
  WindowScroller,
  InfiniteLoader
} from 'react-virtualized'

import './index.scss'
import { GetHouseList } from '../../api'
import HouseItem from '../../components/HouseItem'

function HouseList() {
  const navigate = useNavigate(),
    [list, setList] = useState([]),
    baseUrl = process.env.REACT_APP_URL,
    [count, setCount] = useState(0)
  useEffect(() => {
    GetHouseList({
      start: 1,
      end: 20
    }).then(respose => {
      const res = respose.data.body
      console.log(res.list)
      setList(list => [...res.list])
      setCount((count) => res.count)
    })
  }, [])
  const RenderHouses = ({ index, key, style }) => {
    const house = list[index]
    if (!house) {
      return (
        <div key={key} style={style}>
          <p className="loading" />
        </div>
      )
    }
    return (
      <HouseItem
        handlerClick={() => { navToDetail(house.houseCode) }}
        key={key}
        tags={house.tags}
        title={house.title}
        desc={house.desc}
        src={baseUrl + house.houseImg}
        price={house.price}
      />
    )
  }
  const navToDetail = (id) => {
    navigate('/nav/house-detail', { state: { id: id } })
  }
  return (
    <>
      <ul className='house-list'>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              rowCount={20}
              rowHeight={120}
              rowRenderer={RenderHouses}
              width={width}
            />
          )}
        </AutoSizer>
      </ul>
    </>

  )

}

export default HouseList