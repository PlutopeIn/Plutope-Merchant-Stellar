import React, { useState } from 'react'
import Index from '../../Index';
import PagesIndex from '../../PagesIndex';
import './defaultLayout.css'
import './defaultLayout.responsive.css'


export default function UserHeader() {

  const [isActive, setIsActive] = useState(false);

  const handleClick = event => {
    // 👇️ toggle isActive state on click
    setIsActive(current => !current);
    document.body.classList[isActive ? "remove" : "add"]('body-overflow');
  };
  return (
      <Index.Box className="header-main">
        <Index.Box className="container">
          <Index.Box className="header-row">
            <Index.Box className="header-cust-col">
              <Index.Box className="header-logo-box">
                <img src={PagesIndex.Png.userlogo} className='header-logo' alt='logo' />
              </Index.Box>
            </Index.Box>
            <Index.Box className="header-cust-col">
              <Index.Box className={`header-nav-main ${isActive ? "mobilemenu-active" : ""}`}>
                <Index.List className='header-nav-ul'>
                  <Index.ListItem className='header-nav-li'>
                    <Index.Link className='header-nav-link'>Categories</Index.Link>
                  </Index.ListItem>
                  <Index.ListItem className='header-nav-li'>
                    <Index.Link className='header-nav-link'>About us</Index.Link>
                  </Index.ListItem>
                  <Index.ListItem className='header-nav-li'>
                    <Index.Link className='header-nav-link'>Solutions</Index.Link>
                  </Index.ListItem>
                  <Index.ListItem className='header-nav-li'>
                    <Index.Link className='header-nav-link'>Financial Services</Index.Link>
                  </Index.ListItem>
                  <Index.ListItem className='header-nav-li'>
                    <Index.Link className='header-nav-link'>Contact</Index.Link>
                  </Index.ListItem>
                </Index.List>
              </Index.Box>
            </Index.Box>
            <Index.Box className="header-cust-col">
              <Index.Box className="header-right-main user-border-btn-main">
                {/* <Index.Link className='header-login-link'><img src={PagesIndex.Png.usericon} className='header-user-icon' />Login/Register</Index.Link> */}
                <Index.Button className='header-btn user-border-btn'><span>Login</span></Index.Button>
                <Index.Button className='header-btn user-border-btn'><span>Sign Up</span></Index.Button>
                <Index.Button className='mobile-menu-btn' onClick={handleClick}>
                  <img src={PagesIndex.Svg.mobilemenu} className='mobile-menu-icon' />
                </Index.Button>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
  )
}
