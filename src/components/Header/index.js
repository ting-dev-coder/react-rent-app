import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar } from 'antd-mobile'

function Header(props) {
  const { children, onBackClick } = props,
    navigate = useNavigate()
  const defaultHandler = () => navigate.goBack()
  return (
    <>
      <NavBar
        onBack={onBackClick || defaultHandler}
      >
        {children}
      </NavBar>
    </>
  )
}

export default Header