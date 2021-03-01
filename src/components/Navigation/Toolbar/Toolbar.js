import React from "react";
import classses from './Toolbar.module.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = () => {
  return(
      <header className={classses.Toolbar}>
        <div>Menu</div>
        <Logo/>
        <nav>
          <NavigationItems/>
        </nav>
      </header>
  )
}

export default toolbar;