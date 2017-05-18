import React, { Component } from 'react';
 import './content.css';
export default class Content extends Component {

  render() {


    return (
      <div className="content" id="content">
        {this.props.children}
      </div>

    );
  }
}
