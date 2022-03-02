import React from 'react'
import Header from '../../components/Header'
import { Outlet } from 'react-router-dom'
function LayoutNav() {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default LayoutNav