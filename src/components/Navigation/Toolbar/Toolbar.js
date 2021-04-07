import React from "react";
import classes from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggler from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => {
  return(
      <header className={classes.Toolbar}>
        <DrawerToggler clicked={props.toggleSidebar}/>
        <div className={classes.Logo}>
          <Logo height='80%'/>
        </div>
        <nav className={classes.DesktopOnly}>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
      </header>
  )
}

export default toolbar;