import React from "react";
import classses from './Toolbar.module.css'

const toolbar = () => {
  return(
      <header className={classses.Toolbar}>
        <div>Menu</div>
        <div>logo</div>
        <nav>
          <ul>
            ...
          </ul>
        </nav>
      </header>
  )
}

export default toolbar;