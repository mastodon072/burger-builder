import React from "react";
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import classes from './SideDrawer.module.css'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {

  return (
      <Aux>
        <Backdrop show={props.show} clicked={props.clicked}/>
        <div className={[classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ')} onClick={props.clicked}>
          <div className={classes.Logo}>
            <Logo/>
          </div>
          <NavigationItems isAuthenticated={props.isAuth}/>
        </div>
      </Aux>
  )

}
export default sideDrawer;