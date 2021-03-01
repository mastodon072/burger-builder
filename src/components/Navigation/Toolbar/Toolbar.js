import React from "react";
import classses from './Toolbar.module.css'
import Logo from '../../Logo/Logo'

const toolbar = () => {
  return(
      <header className={classses.Toolbar}>
        <div>Menu</div>
        <Logo/>
        <nav>
          <ul>
            ...
          </ul>
        </nav>
      </header>
  )
}

export default toolbar;