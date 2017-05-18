import React, { Component } from 'react';
import './TreeComponent.css';
import TreeItem from '../TreeItem';

export default class TreeComponent extends Component {


  render() {

    return (
      <div className={this.props.classNames.wrapperName}>
      {this.props.data.map((item,i)=>{
        return (<TreeItem key={"tvs"+i} 
        	{...item}
          token={this.props.token}
         	classNames={this.props.classNames}
         	handleClick={this.props.handleClick} />);
      })}      
      </div>

    );
  }
}


