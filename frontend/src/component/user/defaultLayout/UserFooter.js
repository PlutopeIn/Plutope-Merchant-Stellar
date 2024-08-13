import React from 'react'
import PagesIndex from '../../PagesIndex'
import Index from '../../Index'
import './defaultLayout.css'
import './defaultLayout.responsive.css'

export default function UserFooter() {
  return (
      <Index.Box className="footer">
        <Index.Box className="container">
          <Index.Box className='grid-row footer-row'>
            <Index.Box sx={{ width: 1 }} className="grid-main">
              <Index.Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={{ xs: 2, sm: 2, md: 0, lg: 0 }}>
                <Index.Box gridColumn={{ xs: "span 12", sm: "span 4", md: "span 4", lg: "span 5" }} className="grid-column">
                  <Index.Box className="footer-col">
                    <Index.Box className="footer-logo-box">
                      <img src={PagesIndex.Png.userlogo} className='footer-logo' alt='logo' />
                    </Index.Box>
                    <Index.Typography className='footer-para'>
                      Welcome to the future of gaming, by gamers, for gamers
                    </Index.Typography>
                  </Index.Box>
                </Index.Box>
                <Index.Box gridColumn={{ xs: "span 12", sm: "span 8", md: "span 8", lg: "span 7" }} className="grid-column">
                  <Index.Box className='grid-row'>
                    <Index.Box sx={{ width: 1 }} className="grid-main">
                      <Index.Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={{ xs: 2, sm: 2, md: 0, lg: 0 }}>
                        <Index.Box gridColumn={{ xs: "span 12", sm: "span 4", md: "span 4", lg: "span 4" }} className="grid-column">
                          <Index.Box className="footer-inner-col">
                            <Index.Box className="footer-nav-main">
                              <Index.Typography className='footer-nav-titles'>Socials</Index.Typography>
                              <Index.List className='footer-nav-ul'>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>Discord</Index.Link>
                                </Index.ListItem>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>Team</Index.Link>
                                </Index.ListItem>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>YouTube</Index.Link>
                                </Index.ListItem>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>Twitch</Index.Link>
                                </Index.ListItem>
                              </Index.List>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                        <Index.Box gridColumn={{ xs: "span 12", sm: "span 4", md: "span 4", lg: "span 4" }} className="grid-column">
                          <Index.Box className="footer-inner-col">
                            <Index.Box className="footer-nav-main">
                              <Index.Typography className='footer-nav-titles'>Services</Index.Typography>
                              <Index.List className='footer-nav-ul'>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>Games</Index.Link>
                                </Index.ListItem>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>Genres</Index.Link>
                                </Index.ListItem>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>Reviews</Index.Link>
                                </Index.ListItem>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>News</Index.Link>
                                </Index.ListItem>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>Events</Index.Link>
                                </Index.ListItem>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>Chains</Index.Link>
                                </Index.ListItem>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>Platforms</Index.Link>
                                </Index.ListItem>
                              </Index.List>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                        <Index.Box gridColumn={{ xs: "span 12", sm: "span 4", md: "span 4", lg: "span 4" }} className="grid-column">
                          <Index.Box className="footer-inner-col">
                            <Index.Box className="footer-nav-main">
                              <Index.Typography className='footer-nav-titles'>Company</Index.Typography>
                              <Index.List className='footer-nav-ul'>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>About Us</Index.Link>
                                </Index.ListItem>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>Team</Index.Link>
                                </Index.ListItem>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>Partners</Index.Link>
                                </Index.ListItem>
                                <Index.ListItem className='footer-nav-li'>
                                  <Index.Link className='footer-nav-link'>Media Kit</Index.Link>
                                </Index.ListItem>
                              </Index.List>
                            </Index.Box>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
        <Index.Box className="container">
          <Index.Box className="footer-copy-right-box">
            <Index.Typography className='footer-copy-right-text'>All Copyrights Reserved © 2023</Index.Typography>
          </Index.Box>
        </Index.Box>
      </Index.Box>
  )
}
