import React from "react";
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import classes from './SideDrawer.module.css'
import Aux from '../../../hoc/Aux'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {

  return (
      <Aux>
        <Backdrop show={props.show} clicked={props.clicked}/>
        <div className={[classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ')}>
          <div className={classes.Logo}>
            <Logo/>
          </div>
          <NavigationItems/>
        </div>
      </Aux>
  )

}
export default sideDrawer;