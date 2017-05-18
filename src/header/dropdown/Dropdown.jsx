import React, { Component } from 'react';
import './dropdown.css';

class Dropdown extends Component {

    constructor() {
        super();
        this._logout = this._logout.bind(this);
        this._account = this._account.bind(this);

    }
    _logout(e) {
        this.props.keycloak.logout({ redirectUri: "https://genny.outcome-hub.com/" });
        this.props.keycloak.loadUserProfile().success((user) => console.log(user));
        //e.preventDefault();
    }

    _account() {
        this.props.keycloak.accountManagement();
        //e.preventDefault();
    }

    render() {
        return (
            <div className="dropdown" id="dropdown">
                <hr />
                <li onMouseDown={this._account}>
                    <a href="/account" >account
                    <i className="material-icons" style={{ fontSize: "18px", float: "right", paddingRight:"5px" }}>settings</i>
                    </a>
                </li>
                <hr />
                <li onMouseDown={this._logout}>
                    <a href="/logout" >logout
                    <i className="material-icons" style={{ fontSize: "18px", float: "right", paddingRight: "5px" }}>exit_to_app</i>
                    </a>
                </li>
            </div>
        );
    }
}

export default Dropdown;