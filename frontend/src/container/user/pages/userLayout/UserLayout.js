import React from 'react'
import { Outlet } from 'react-router-dom'
import PagesIndex from '../../../../component/PagesIndex'

const UserLayout = () => {
  return (
    <>
      <PagesIndex.UserHeader />
      <Outlet />
      <PagesIndex.UserFooter />
    </>
  )
}

export default UserLayout;