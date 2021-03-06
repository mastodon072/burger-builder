import React from "react";
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'


const navigationItems = (props) => {
  return (
      <ul className={classes.NavigationItems}>
        <NavigationItem exact link='/'>Burger Builder</NavigationItem>
        {props.isAuthenticated && <NavigationItem link="/orders">Orders</NavigationItem>}
        {props.isAuthenticated 
          ? <NavigationItem link="/logout">Logout</NavigationItem>
          : <NavigationItem link="/auth">Login</NavigationItem>
        }
      </ul>
  )
}

export default navigationItems;