import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PagesIndex from '../../PagesIndex';
import Index from '../../Index';

export default function AdminSidebar({ open, setOpen }) {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [submenuOpen, setSubmenuOpen] = useState("Members"); // Set the first submenu to open by default

  useEffect(() => {
    // Find the active menu item based on the current URL pathname
    const activeItem = menuItem.find(item => location.pathname === item.url);
    setActiveMenuItem(activeItem ? activeItem.name : null);
  }, [location]);

  const menuItem = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: <PagesIndex.GridViewIcon />,
      submenu: null // No submenu for Dashboard
    },
    {
      name: "Users",
      url: "/admin/user-list",
      icon: <PagesIndex.ManageAccountsOutlinedIcon />,
      submenu: null // No submenu for Dashboard
    },
    {
      name: "Assets",
      url: "/admin/assets",
      icon: <PagesIndex.Diversity2OutlinedIcon />,
      submenu: null // No submenu for Dashboard
    },
    // {
    //   name: "Transaction",
    //   url: "/admin/transaction-list",
    //   icon: <PagesIndex.SyncAltIcon />,
    //   submenu: null // No submenu for Dashboard
    // },
    // {
    //   name: "Category",
    //   url: "/admin/category",
    //   icon: <PagesIndex.ListAltIcon />,
    //   submenu: null // No submenu for Dashboard
    // },
    // {
    //   name: "Business",
    //   url: "/admin/business",
    //   icon: <PagesIndex.HomeWorkOutlinedIcon />,
    //   submenu: null // No submenu for Dashboard
    // },
    {
      name: "KYC",
      url: "/admin/kyc",
      icon: <PagesIndex.TaskOutlinedIcon />,
      submenu: null // No submenu for Dashboard
    },
    {
      name: "KYB",
      url: "/admin/kyb",
      icon: <PagesIndex.CasesOutlinedIcon />,
      submenu: null // No submenu for Dashboard
    },
    {
      name: "Invoices",
      url: "/admin/invoices",
      icon: <PagesIndex.ReceiptIcon />,
      submenu: null // No submenu for Dashboard
    },
    {
      name: "Delete Requests",
      url: "/admin/delete-request",
      icon: <PagesIndex.AutoDeleteIcon />,
      submenu: null // No submenu for Dashboard
    },
    // {
    //   name: "Color",
    //   url: "/admin/color-list",
    //   icon: <PagesIndex.ColorLensIcon />,
    //   submenu: null // No submenu for Dashboard
    // },
    // {
    //   name: "Font",
    //   url: "/admin/font-list",
    //   icon: <PagesIndex.FontDownloadOutlinedIcon />,
    //   submenu: null // No submenu for Dashboard
    // },
    {
      name: "Settings",
      icon: <PagesIndex.SettingsOutlinedIcon />,
      submenu: [
        {
          name: "Business Types",
          url: "/admin/business",
          icon: <PagesIndex.HomeWorkOutlinedIcon />,
        },
        {
          name: "Category",
          url: "/admin/category",
          icon: <PagesIndex.ListAltIcon />,
        },
        // {
        //   name: "Color",
        //   url: "/admin/color-list",
        //   icon: <PagesIndex.ColorLensIcon />,
        // },
        // {
        //   name: "Font",
        //   url: "/admin/font-list",
        //   icon: <PagesIndex.FontDownloadOutlinedIcon />,
        // }
      ]
    },
    {
      name: "CMS",
      icon: <PagesIndex.DevicesOtherIcon />,
      submenu: [
        {
          name: "Terms & Conditions",
          url: "/admin/terms-condition",
          icon: <PagesIndex.ReceiptLongIcon />,
        },
        {
          name: "Privacy Policy",
          url: "/admin/privacy-policy",
          icon: <PagesIndex.SyncLockIcon />,
        },
        {
          name: "FAQ",
          url: "/admin/faq",
          icon: <PagesIndex.QuizOutlinedIcon />,
        },
        {
          name: "Contact Us",
          url: "/admin/contact-us",
          icon: <PagesIndex.ContactMailOutlinedIcon />,
        }
      ]
    }
  ];

  const handleMenuItemClick = (name) => {
    if (window.innerWidth <= 991) {
      // Close the sidebar if it's open and the window width is less than or equal to 768px
      setOpen(false);
    }
    if (submenuOpen === name) {
      setSubmenuOpen(null); // Close submenu if it's already open
    } else {
      setSubmenuOpen(name); // Open submenu
    }
  };

  return (
      <nav className={"sidebar sidebar-offcanvas" + (open ? ' active' : '')} id="sidebar">
        <ul className="nav">
          {menuItem.map((parentItem, parentIndex) => (
            <li key={`${parentItem.name}-${parentIndex}`} className={`nav-item${activeMenuItem === parentItem.name ? ' active' : ''}`}>
              <Link
                className="nav-link"
                to={parentItem.url}
                onClick={() => handleMenuItemClick(parentItem.name)} // Pass parent item name to handleMenuItemClick
              >
                {parentItem.icon}
                <span className="menu-title">{parentItem.name}</span>
                {parentItem.submenu && (
                  <Index.Box className="down-arrow">
                    <PagesIndex.KeyboardArrowDownIcon />
                  </Index.Box> // Add arrow icon for items with submenu
                )}
              </Link>
              {submenuOpen === parentItem.name && parentItem.submenu && (
                <ul className="nav flex-column sub-menu">
                  {parentItem.submenu.map((childItem, childIndex) => (
                    <li key={`${childItem.name}-${childIndex}`} className={`nav-item${location.pathname === childItem.url ? ' active' : ''}`}>
                      <Link className="nav-link" to={childItem.url}>
                        {childItem.icon}
                        <span className="menu-title">{childItem.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
  );
}