import { Footer, Header } from 'antd/es/layout/layout'
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