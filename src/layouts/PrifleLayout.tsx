import { Footer, Header } from 'antd/es/layout/layout'
import React from 'react'
import { Outlet } from 'react-router-dom'

const PrifleLayout = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default PrifleLayout