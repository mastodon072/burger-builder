import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import classes from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

class Layout  extends Component {
  state = {
    showSidebar: false
  }

  handleSidebarToggle = () => {
    this.setState({showSidebar: !this.state.showSidebar})
  }

  render() {
      return (
          <Aux>
            <Toolbar toggleSidebar={this.handleSidebarToggle}/>
            <SideDrawer show={this.state.showSidebar} clicked={this.handleSidebarToggle}/>
            <main className={classes.Content}>
              {this.props.children}
            </main>
          </Aux>
      )
  }
}

export default Layout;
