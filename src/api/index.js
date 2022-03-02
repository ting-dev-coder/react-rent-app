import axios from 'axios'

// const claims = { headers: { Authorization: 'Bearer ' + setting.get('claims') } }
const basUrl = 'http://localhost:8080'
export const GetSwiper = () => axios.get(`${basUrl}/home/swiper`)

export const GetGroup = (areaID) => axios.get(`${basUrl}/home/groups`, {
  params: areaID
})

export const GetNews = (areaID) => axios.get(`${basUrl}/home/news`, {
  params: areaID
})

export const GetHouseList = (filter) => axios.get(`${basUrl}/houses`, {
  params: filter
})
export const GetHouseDetail = (id) => axios.get(`${basUrl}/houses/${id}`)

export const GetUser = () => axios.get(`${basUrl}/user`)
