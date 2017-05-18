import React, { Component } from 'react';
import './header.css';
import Dropdown from './dropdown';

export default class Header extends Component {

  constructor() {
    super();
    this.state = ({
      showUserProfile: false,
      showSidebar: true,
      transform:"rotate(0)"
    });
    this._renderDropdown = this._renderDropdown.bind(this);
    this._hideDropdown = this._hideDropdown.bind(this);
    this._renderSidebar = this._renderSidebar.bind(this);
  }
  componentDidMount () {
    //this is to hide sidebar when the scree size is small
    // var element = document.getElementById('sidebar'),
    // style = window.getComputedStyle(element),
    // width = style.getPropertyValue('width');
    // //alert(width);
    // if (width === "0px") {
    //   document.getElementById('sidebar').style.width = "0";
    //   document.getElementById('content').style.marginLeft = "0";
    //   this.setState({ showSidebar: false });
    // }
  }
  _renderDropdown() {
    const { showUserProfile } = this.state;
    if (showUserProfile === false) {
      document.getElementById('dropdown').style.display = "block";
      this.setState({ showUserProfile: true,transform:"rotate(180deg)" });
    }
    else {
      document.getElementById('dropdown').style.display = "none";
      this.setState({ showUserProfile: false, transform: "rotate(0deg)"});
    }
  }

  _hideDropdown() {
    document.getElementById('dropdown').style.display = "none";
    this.setState({ showUserProfile: false, transform: "rotate(0deg)"});
  }

  _renderSidebar() {
    const { showSidebar } = this.state;
    if (showSidebar === true) {
      document.getElementById('sidebar').style.width = "0";
      document.getElementById('content').style.marginLeft = "0";
      this.setState({ showSidebar: false });
    }
    else {
      document.getElementById('sidebar').style.width = "200px";
      document.getElementById('content').style.marginLeft = "200px";
      this.setState({ showSidebar: true });
    }
  }

  _logout(e) {
    this.props.keycloak.logout({ redirectUri: "https://genny.outcome-hub.com/" });
    e.preventDefault();
  }

  _account() {
    this.props.keycloak.accountManagement();
  }

  render() {
    var { user, logo, keycloak } = this.props;
    (user === undefined) ? user = { image: './images/user.png', name: 'sam' } : user = user;
    (logo === undefined) ? logo = "logo" : logo;

    return (

      <div className="navbar">
        <div className="navbar-brand" >
          <table className="navbar-brand">
            <tbody>
            <tr>
              <td> <i className="material-icons" onClick={this._renderSidebar}> menu</i></td>
              <td> <a className="logo">{logo}</a></td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className="navbar-right" >
          <button className={this.state.showUserProfile ? "userProfileActive" : "userProfile"} onBlur={this._hideDropdown} onClick={this._renderDropdown} style={{ transition: "0.3s ease-in" }}>
            <table>
              <tbody>
              <tr>
                <td> <text style={{ fontSize: "13px", marginRight: "5px" }}>Hi, {user.name}</text> </td>
                <td> <img src={user.image} className="userImage"></img> </td>
                <td> <i className="material-icons" style={{ transform:`${this.state.transform}`,transition: "0.5s ease transform"}}>keyboard_arrow_down</i> </td>
              </tr>
              </tbody>
            </table>
          </button>
          <Dropdown keycloak={keycloak}/>
        </div>
        <div>
        
        </div>
      </div >


    );
  }
}
