import React,{useState} from 'react'
import { Outlet } from 'react-router-dom';
import Index from '../../../Index';
import PagesIndex from '../../../PagesIndex';
import './adminLayout.css'
import './adminLayout.responsive.css'



export default function AdminLayOut() {

  const [open,setOpen] =useState(true);
  
  return (
    <div>   
      <Index.Box className="admin-dashboard-main">
      <Index.Box className={`admin-dashboard-left-main ${open?"active":"admin-sidebar-deactive"}`}>
          <PagesIndex.Sidebar open={open} setOpen={setOpen}/>
        </Index.Box>
        <Index.Box className="admin-dashboard-right-main">
          <PagesIndex.Header setOpen={setOpen} open={open}/>
          <Index.Box className="admin-dashboard-containt-main">
          <Outlet/>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </div>
  )
}
