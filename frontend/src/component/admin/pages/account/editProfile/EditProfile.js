import React from 'react'
import Index from '../../../../Index'
import PagesIndex from '../../../../PagesIndex'
import './editProfile.css'
import './editProfile.responsive.css'


export default function EditProfile() {


      // for Language dropdown
      const [age, setAge] = React.useState('');

      const handleChangeLanguagedropdown = (event) => {
            setAge(event.target.value);
      };


      // for custom switch design

      const IOSSwitch = Index.styled((props) => (
            <Index.Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
      ))(({ theme }) => ({
            width: 34,
            height: 20,
            padding: 0,
            '& .MuiSwitch-switchBase': {
                  padding: 0,
                  margin: 3,
                  transitionDuration: '300ms',
                  '&.Mui-checked': {
                        transform: 'translateX(16px)',
                        color: '#fff',
                        '& + .MuiSwitch-track': {
                              backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#114A65',
                              opacity: 1,
                              border: 0,
                        },
                        '&.Mui-disabled + .MuiSwitch-track': {
                              opacity: 0.5,
                        },
                  },
                  '&.Mui-focusVisible .MuiSwitch-thumb': {
                        color: '#33cf4d',
                        border: '6px solid #fff',
                  },
                  '&.Mui-disabled .MuiSwitch-thumb': {
                        color:
                              theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[600],
                  },
                  '&.Mui-disabled + .MuiSwitch-track': {
                        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
                  },
            },
            '& .MuiSwitch-thumb': {
                  boxSizing: 'border-box',
                  width: 14,
                  height: 14,
                  boxShadow: "none",
            },
            '& .MuiSwitch-track': {
                  borderRadius: 26 / 2,
                  backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
                  opacity: 1,
                  transition: theme.transitions.create(['background-color'], {
                        duration: 500,
                  }),
            },
      }));
      return (
         
                  <Index.Box className="admin-edit-profile-main common-card">
                        <Index.Typography className='admin-common-para admin-edit-highlight-text' component='p' variant='p'>General</Index.Typography>
                        <Index.Typography className='admin-common-para admin-edit-para-text' component='p' variant='p'>Basic info, like your name and address that will displayed in public</Index.Typography>
                        <Index.Box className="admin-edit-profile-flex">
                              <Index.Box className="admin-file-upload-btn-main">
                                    <img src={PagesIndex.Png.usericon} className="admin-upload-profile-img" alt='upload img'></img>
                                    <Index.Button variant="contained" component="label" className='admin-file-upload-btn'>
                                          <img src={PagesIndex.Svg.edit} className="admin-upload-icon-img" alt='upload img'></img>
                                          <input hidden accept="image/*" multiple type="file" />
                                    </Index.Button>
                              </Index.Box>
                              <Index.Box className="admin-switch-main">
                                    <Index.FormControlLabel
                                          control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                                          label="Public Profile" className='admin-switch-lable'
                                    />
                              </Index.Box>
                        </Index.Box>
                        <Index.Box className="admin-add-user-data-main">
                              <Index.Box className="edit-profile-row">
                                    <Index.Box className="grid-column">
                                          <Index.Box className="admin-input-box admin-add-user-input">
                                                <Index.FormHelperText className='admin-form-lable'>Name</Index.FormHelperText>
                                                <Index.Box className="admin-form-group">
                                                      <Index.TextField
                                                            fullWidth
                                                            id="fullWidth"
                                                            className="admin-form-control"
                                                            placeholder=""
                                                      />
                                                </Index.Box>
                                          </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="grid-column">
                                          <Index.Box className="admin-input-box admin-add-user-input">
                                                <Index.FormHelperText className='admin-form-lable'>Email</Index.FormHelperText>
                                                <Index.Box className="admin-form-group">
                                                      <Index.TextField
                                                            fullWidth
                                                            id="fullWidth"
                                                            className="admin-form-control"
                                                            placeholder=""
                                                      />
                                                </Index.Box>
                                          </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="grid-column">
                                          <Index.Box className="admin-input-box admin-add-user-input">
                                                <Index.FormHelperText className='admin-form-lable'>Title</Index.FormHelperText>
                                                <Index.Box className="admin-form-group">
                                                      <Index.TextField
                                                            fullWidth
                                                            id="fullWidth"
                                                            className="admin-form-control"
                                                            placeholder=""
                                                      />
                                                </Index.Box>
                                          </Index.Box>
                                    </Index.Box>
                                    <Index.Box className="grid-column">
                                          <Index.Box className="admin-input-box admin-add-user-input">
                                                <Index.FormHelperText className='admin-form-lable'>Language</Index.FormHelperText>
                                                <Index.Box className='admin-dropdown-box'>
                                                      <Index.FormControl className='admin-form-control admin-drop-form-control'>
                                                            <Index.Select className='admin-dropdown-select admin-drop-select'
                                                                  value={age}
                                                                  onChange={handleChangeLanguagedropdown}
                                                                  displayEmpty
                                                                  inputProps={{ 'aria-label': 'Without label' }}
                                                            >
                                                                  <Index.MenuItem value="" className='admin-drop-menuitem'>
                                                                        English
                                                                  </Index.MenuItem>
                                                                  <Index.MenuItem value={10} className='admin-drop-menuitem'>English</Index.MenuItem>
                                                                  <Index.MenuItem value={20} className='admin-drop-menuitem'>English</Index.MenuItem>
                                                                  <Index.MenuItem value={30} className='admin-drop-menuitem'>English</Index.MenuItem>
                                                            </Index.Select>
                                                            {/* <span><img src={Index.Svg.instagram} className="grey-down pay-down" alt='down arrow'></img></span> */}
                                                      </Index.FormControl>
                                                </Index.Box>
                                          </Index.Box>
                                    </Index.Box>
                              </Index.Box>
                              <Index.Box className="admin-user-btn-flex">
                                    <Index.Box className="admin-discard-btn-main">
                                          <PagesIndex.BorderButton btnLabel="Discard" className='admin-discard-user-btn border-btn' />
                                    </Index.Box>
                                    <Index.Box className="admin-save-btn-main btn-main-primary">
                                          <Index.Button className='admin-save-user-btn btn-primary'><img src={PagesIndex.Svg.save} className="admin-user-save-icon" alt='Save'></img>Save</Index.Button>
                                    </Index.Box>
                              </Index.Box>
                        </Index.Box>
                  </Index.Box>
            
      )
}
