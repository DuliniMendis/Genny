import React, { Component } from 'react';
import './TreeItem.css';
import axios from 'axios';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


export default class TreeItem extends Component {

constructor(props){
  super(props);
  this.state = {
    isMenuVisible: false,
    list:props.list,
    loading:false
  }
}

componentWillReceiveProps(newProps){
  this.setState({list:newProps.list});
}

handleClick = (evt) =>{
  if(!this.state.isMenuVisible){
    this.setState({loading:true});
  let token = this.props.token;
  axios({
      url: 'qwanda/baseentitys/'+this.props.value+'/linkcodes/PRI_LINK1',
      method: 'get',
      baseURL: 'https://qwanda-service.outcome-hub.com/',
      data: {},
      headers: { 'Authorization': `Bearer ${token}` }
    }).then((response) => {
      if(response.data && response.data.length>0){
        console.log(response.data)
        let newList = response.data.map((item) => {
          let newItem = {
            id:item.id,
            name:item.name,
            value:item.code
          };
          return newItem; 
        });
        
        this.setState({
          list:newList,
          isMenuVisible:!this.state.isMenuVisible
        });
      }
       this.setState({
          loading:false
        });
      
    }).catch(error => {
      console.log(error);
       this.setState({
          loading:false
        });
    })
  }
  else{
    this.setState({
          isMenuVisible:!this.state.isMenuVisible,
          loading:false
        });
  }

  //this.props.handleClick(evt);
}

  render() {

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

    let list = this.state.list?this.state.list:[];

    let sortIcon= "";
    if(this.state.isMenuVisible){
        sortIcon =  (<i className="material-icons">keyboard_arrow_down</i>);
    }

    let level = this.props.level?this.props.level+1:1;
    let paddingLeft= this.props.paddingLeft ? this.props.paddingLeft : 0;
    paddingLeft += 10*level;

    let progress = "";
    if(this.state.loading)
        progress = (<span className="progress"><MuiThemeProvider><CircularProgress size={15} thickness={3}/></MuiThemeProvider></span>);

    return (
      <div>
        <div onClick={this.handleClick} className={this.props.classNames.itemName} style={{paddingLeft:paddingLeft}} id={this.props.id}>
          {this.props.name} 

          {progress}
         
          {sortIcon}
        </div>
        <div className={this.state.isMenuVisible===true ? "visible-menu" : "hidden-menu"}>
        {list.map((item,i) => {
          return <TreeItem 
          key={"tvs"+i} 
          {...item}
          token={this.props.token}
          classNames={this.props.classNames}
          level={level} 
          handleClick={this.props.handleClick} /> 
        })}   
        </div>
      </div>

    );
  }
}
