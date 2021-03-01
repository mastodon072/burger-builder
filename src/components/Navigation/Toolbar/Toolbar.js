import React from "react";
import classses from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => {
  return(
      <header className={classses.Toolbar}>
        <div onClick={props.toggleSidebar} className={classses.Menu}>Menu</div>
        <div className={classses.Logo}>
          <Logo height='80%'/>
        </div>
        <nav className={classses.DesktopOnly}>
          <NavigationItems/>
        </nav>
      </header>
  )
}

export default toolbar;