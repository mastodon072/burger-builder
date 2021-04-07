import React, {Component} from 'react'
import {connect} from 'react-redux'

import Aux from '../Aux/Aux'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout  extends Component {
  state = {
    showSidebar: false
  }

  handleSidebarToggle = () => {
    this.setState((prevState) => { return {showSidebar: !prevState.showSidebar}})
  }

  render() {
      return (
          <Aux>
            <Toolbar 
              isAuth={this.props.isAuthenticated}
              toggleSidebar={this.handleSidebarToggle}/>
            <SideDrawer 
              isAuth={this.props.isAuthenticated}
              show={this.state.showSidebar} clicked={this.handleSidebarToggle}/>
            <main className={classes.Content}>
              {this.props.children}
            </main>
          </Aux>
      )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(Layout);
