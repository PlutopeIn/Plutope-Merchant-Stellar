import React from 'react'
import PagesIndex from '../../PagesIndex'
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import Index from '../../Index';
import { logoutAdmin } from '../../../redux/features/slices/admin/adminSlice';

export default function AdminHeader({ toggleSidebar }) {
  const navigate = PagesIndex.useNavigate();
  const dispatch = PagesIndex.useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate('/')
  };


  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
          <a className="navbar-brand brand-logo" href="/admin/dashboard">
            <img src={PagesIndex.Png.logoNew} alt='logo' />
          </a>
          <a className="navbar-brand brand-logo-mini" href="/admin/dashboard">
            {/* <img src={PagesIndex.Svg.logoMini} alt='logo' /> */}
            <img src={PagesIndex.Png.logoNew} alt='logo' />
          </a>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-stretch">
          <button onClick={toggleSidebar} className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <PagesIndex.SortIcon />
          </button>
          <div className="search-field d-none d-md-block">
            <form className="d-flex align-items-center h-100" action="#">
              <div className="input-group">
                <div className="input-group-prepend bg-transparent">
                  <i className="input-group-text border-0 mdi mdi-magnify"></i>
                </div>
                {/* <input type="text" className="form-control bg-transparent border-0" placeholder="Search projects"> */}
              </div>
            </form>
          </div>
          <ul className="navbar-nav navbar-nav-right">
              <Index.Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Index.Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    className="profile-menu-btn"
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
                  </IconButton>
                </Index.Tooltip>
              </Index.Box>
              <Index.Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 26,
                      height: 26,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Index.Link to="/admin/update-profile" className="profile-box-detail">
                  <Index.MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                  </Index.MenuItem>
                </Index.Link>

                {/* <Index.Link to="/admin/change-password" className="profile-box-detail">
                  <Index.MenuItem onClick={handleClose}>
                    <Avatar /> Change Password
                  </Index.MenuItem>
                </Index.Link> */}
                {/* <Divider /> */}

                <Index.Link className="profile-box-detail">
                  <Index.MenuItem onClick={handleLogout} className="profile-box-detail">
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </Index.MenuItem>
                </Index.Link>

              </Index.Menu>
            
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" onClick={toggleSidebar} type="button" data-toggle="offcanvas">
            <PagesIndex.SortIcon />
          </button>
        </div>
    </nav>

  )
}
