import React, { Component} from 'react'
import Login from './Login'
import Signup from "./Signup";
import {Grid, List, Drawer, ListItem, ListItemText, IconButton, DialogTitle, Dialog, Tabs, Tab} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import {connect} from 'react-redux'
import {logoutUser} from '../../../actions/user'


 class MenuButton extends Component {
  constructor(){
    super()
    this.state = { 
      dialogOpen: false,
      login: true,
      signup: false,
      value: 0,
    }
  }


handleOpen = () => {
  this.setState({
    dialogOpen: true
  })
  }

  handleClose = () => {
    this.setState({ dialogOpen: false})
    this.props.toggleDrawer()
  }

handleLogin = () => {
  this.setState({
    login: true,
    signup: false
  })
  }

  handleSignup = () => {
  this.setState({
    login: false,
    signup: true
  })
  }

  setValue = (newValue) => {
    this.setState({value: newValue})
  }

  logout = () => {
    this.handleClose()
    this.props.logoutUser()
  }

  

render() {
  return (
    <Grid item xs={4} align="center">
      <IconButton onClick={() => this.props.toggleDrawer()}>
        <Menu className="button" id="menu-button" fontSize="large" />
      </IconButton>
      <Drawer open={this.props.drawerOpen} onClose={ () => this.props.toggleDrawer()} >
        <List>
          { !this.props.login ? <ListItem button onClick={() => this.handleOpen()}>
            <ListItemText primary="Login/Signup" />
          </ListItem> : null}
         {  this.props.login ? <ListItem button onClick={() => this.logout()}>
            <ListItemText primary="Logout" />
          </ListItem> : null}
        </List>
      </Drawer>
      <Dialog open={this.state.dialogOpen} onClose={() => this.handleClose()} alignitems="center" >
        <DialogTitle >
          <Tabs indicatorColor="primary" value={this.state.value} onChange={this.setValue}>
            <Tab label="Login" value={0} onClick={ () => this.handleLogin()} id="login-tab" className="tabs"/>
            <Tab label="Signup" value={1} onClick={ () => this.handleSignup()} id="signup-tab" className="tabs"/>
          </Tabs>
        </DialogTitle>
      { this.state.login ? <Login handleClose={this.handleClose} /> : <Signup handleClose={this.handleClose}/>}
      </Dialog>
    </Grid>
  )}}

  const mapStateToProps = (state) => {
    return { login: state.user.login}
  }

  export default connect(mapStateToProps, {logoutUser})(MenuButton)

