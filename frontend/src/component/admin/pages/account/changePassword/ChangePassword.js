import React from 'react'
import Index from '../../../../Index'
import PagesIndex from '../../../../PagesIndex'
import './changePassword.css'
import './changePassword.responsive.css'

export default function ChangePassword() {
      return (
            <>

                  <Index.Box className="admin-change-pass-main common-card">
                        <Index.Typography className='admin-common-para admin-edit-highlight-text' component='p' variant='p'>Password</Index.Typography>
                        <Index.Typography className='admin-common-para admin-edit-para-text' component='p' variant='p'>Enter your current & new password to reset your password</Index.Typography>
                        <Index.Box className="admin-input-box admin-change-pass-input-box">
                              <Index.FormHelperText className='admin-form-lable'>Old Password</Index.FormHelperText>
                              <Index.Box className="admin-form-group">
                                    <Index.TextField
                                          fullWidth
                                          id="fullWidth"
                                          className="admin-form-control"
                                          placeholder=""
                                    />
                              </Index.Box>
                        </Index.Box>
                        <Index.Box className="admin-input-box admin-change-pass-input-box">
                              <Index.FormHelperText className='admin-form-lable'>New Password</Index.FormHelperText>
                              <Index.Box className="admin-form-group">
                                    <Index.TextField
                                          fullWidth
                                          id="fullWidth"
                                          className="admin-form-control"
                                          placeholder=""
                                    />
                              </Index.Box>
                        </Index.Box>
                        <Index.Box className="admin-input-box admin-change-pass-input-box">
                              <Index.FormHelperText className='admin-form-lable'>Confirm Password</Index.FormHelperText>
                              <Index.Box className="admin-form-group">
                                    <Index.TextField
                                          fullWidth
                                          id="fullWidth"
                                          className="admin-form-control"
                                          placeholder=""
                                    />
                              </Index.Box>
                        </Index.Box>
                        <Index.Box className="admin-user-btn-flex admin-change-pass-flex">
                              <Index.Box className="admin-discard-btn-main">
                                    <PagesIndex.BorderButton btnLabel="Discard" className='admin-discard-user-btn border-btn' />
                              </Index.Box>
                              <Index.Box className="admin-save-btn-main btn-main-primary">
                                    <Index.Button className='admin-save-user-btn btn-primary'><img src={PagesIndex.Svg.save} className="admin-user-save-icon" alt='Save'></img>Save</Index.Button>
                              </Index.Box>
                        </Index.Box>
                  </Index.Box>
            </>
      )
}
