import React, { Component } from 'react';
import './sidebar.css';


export default class Sidebar extends Component {

  render() {

    return (
      <div className="sidebar" id="sidebar" >
      {this.props.children}
      </div>

    );
  }
}
