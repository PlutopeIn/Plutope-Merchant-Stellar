import React, { useState } from 'react';
import PagesIndex from '../../../../component/PagesIndex';
import { Outlet } from 'react-router-dom';

export default function AdminLayOut() {

  const [open, setOpen] = useState(false);
  const toggleSidebar = () => {
    setOpen(!open);
  }

  return (

    <div className={`${open ? 'sidebar-icon-only' : ''}`}>
      <div className='container-scroller'>
        <PagesIndex.Header open={open} setOpen={setOpen} toggleSidebar={toggleSidebar} />
        <div className='container-fluid page-body-wrapper'>
          <PagesIndex.Sidebar open={open} setOpen={setOpen} />
          <div class="main-panel">
            <div class="content-wrapper">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
