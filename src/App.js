import React, { Component } from 'react';
import { Header, Body, Sidebar, Content, Footer } from './entry';
import Keycloak from 'keycloak-js';
import axios from 'axios';
import md5 from 'js-md5';
import TreeComponent from './components/TreeComponent';
import './App.css';
import AllInOneTable from 'AllInOneTable';

class App extends Component {
	constructor() {
		super();
		this.state = ({
			keycloak: {},
			showTable:false,
			user: {
				image: './images/user.png',
				name: 'sam'
			},
			logo: 'logo',
			data: [{     
	        id: 0,
	        value:'roles',
	        name:'Roles',
	        list : [{
	          id: 4,
	          value: 'prospective',
	          name: 'Prospective'
	        },
	        {
	          id: 5,
	          value: 'active',
	          name: 'Active'
	        },
	        {
	          id: 6,
	          value: 'withdrawn',
	          name: 'Withdrawn'
	        },
	        {
	          id: 7,
	          value: 'placed',
	          name: 'Placed'
	        },
	        {
	          id: 8,
	          value: 'deleted',
	          name: 'Deleted'
	        }],
	        },
	        {
	          id: 1,
	          value:'contacts',
	          name:'Contacts',
	          list : [{
	            id: 9,
	            value: 'intern',
	            name: 'Interns'
	          },
	          {
	            id: 10,
	            value: 'company',
	            name: 'Companies'
	          },
	          {
	            id: 11,
	            value: 'education',
	            name: 'Education'
	          }]
	        }
	      ],
	      sortDirectionAsc:true,
	      sortField:"",
	      tableData : [
		      {
		        code: "j000",
		        title: "Software Engineer",
		        company: "OutcomeHub",
		        contact: "Dom",               
		        phone: "0416234098",
		        required: 2      
		      },
		      {
		        code: "j001",
		        title: "Business Analyst",
		        company: "OutcomeHub",
		        contact: "Adam",        
		        phone: "0416957846",
		        required: 1
		      },
		      {
		        code: "j002",
		        title: "Project Manager",
		        company: "OutcomeHub, Outcome.Life GADA Technology",
		        contact: "Gerard",
		        phone: "0416099284",
		        required: 1
		      },
		      {
		        code: "j003",
		        title: "Marketing Intern",
		        company: "OutcomeHub",
		        contact: "Dom",
		        phone: "0416234098",
		        required: 1
		      },
		      {
		        code: "j004",
		        title: "UI/UX Designer",
		        company: "OutcomeHub",
		        contact: "Dom",
		        phone: "0416234098",
		        required: 1
		      }
	      ],
	      fields:{
	       code: {
	        id:0,
	        type:'text',
	        label:'Code',
	        min:1,
	        max:100,
	        disabled:true
	      },
	      title: {
	        id:1,
	        type:'text',
	        label:'Title',
	        min:1,
	        max:100,
	        disabled:true
	      },
	      company: {
	        id:2,
	        type:'text',
	        label:'Company',
	        min:1,
	        max:100
	      },
	      contact: {
	        id:3,
	        type:'text',
	        label:'Contact',
	        min:1,
	        max:100
	      },
	      phone: {
	        id:4,
	        type:'integer',
	        label:'Phone',
	        min:1,
	        max:100
	      },
	      required: {
	        id:0,
	        type:'integer',
	        label:'Required',
	        min:1,
	        max:100
	      }

	    }
		})
		
	}
	componentWillMount() {
		const kc = Keycloak(process.env.REACT_APP_KEYCLOAK_JSON_FILE);
		
		kc.init({ onLoad: 'login-required' })
			.success((authenticated) => {
				if (authenticated) {
					this.setState({ keycloak: kc })
					this.state.keycloak.loadUserInfo()
						.success((user) => {
							// if ('adamcrow63+1@gmail.com'.includes("+")) {
							// 	var n = 'adamcrow63+1@gmail.com'.indexOf('+');
							// 	var at = 'adamcrow63+1@gmail.com'.indexOf('@');
							// 	var email = 'adamcrow63+1@gmail.com'.substr(0, n) + 'adamcrow63+1@gmail.com'.substr(at);
							// 	alert(email);
							// }
							md5(user.email);
							//md5('adamcrow63@gmail.com');
							const hash = md5.create();
							//hash.update('adamcrow63@gmail.com');
							hash.update(user.email);
							hash.hex();
							const imgUrl = 'https://www.gravatar.com/avatar/' + hash;
							//alert(imgUrl);
							this.setState({ logo: kc.realm, user: { image: imgUrl, name: user.given_name } },()=>{this.getTree();})
						});
				}
				else {
					console.log("user could not authenticated");
				}

			})
			.error(function (err) {
				console.log('failed to initialize');

			})
	}


	getTree = () => {
		let { token } = this.state.keycloak;

		axios({
			url: 'qwanda/baseentitys/',
			method: 'get',
			baseURL: 'https://qwanda-service.outcome-hub.com/',
			data: {},
			headers: { 'Authorization': `Bearer ${token}` }
		}).then((response) => {
			console.log(response.data);
			let newData = response.data.map((item) => {
				let newItem = {
					id:item.id,
					name:item.name,
					value:item.code
				};
				return newItem; 
			});
			this.setState({data:newData,showTable:true});

		}).catch(error => {
			console.log(error);
		})
	}

	handleClick = (evt) => {

		
	}
	componentDidMount(){
		this.render();
	}


	handleSort = (field) => {
    
	    let data = this.state.tableData.slice();

	    let sortedData = data.sort((a,b)=>{
	      if(this.state.sortDirectionAsc) {
	        if(a[field]>b[field])
	            return 1;
	        else if(a[field]<b[field])
	            return -1;
	        else
	            return  0;
	    }
	      else{
	        if(a[field]>b[field])
	            return -1;
	        else if(a[field]<b[field])
	            return 1;
	        else
	            return  0;
	    }
	    });
	    this.setState({
	        tableData:sortedData, 
	        sortDirectionAsc:!this.state.sortDirectionAsc,
	        sortField:field
	    });
	   
	 }

	 handleEdit = (code,field,value) => {

	 }

	render() {

		let classNames = {
	      wrapperName:'tree-wrapper',
	      itemName:'tree-item'
	    };

	    let table = "";
	    if(this.state.showTable)
	    	table = ( <AllInOneTable        
					        data={this.state.tableData} 
					        fields={this.state.fields}
					        sortField={this.state.sortField}
					        sortDirection={this.state.sortDirectionAsc} 
					        sortAction={this.handleSort}         
					        editAction={this.handleEdit}
					        clickAction={this.handleClick}/> );

		var { keycloak, user, logo } = this.state;
		return (
			<div className="intern">
				<Header logo={logo} user={user} keycloak={keycloak} />
				<Body >
					<Sidebar>
						<TreeComponent data={this.state.data} classNames={classNames} handleClick={this.handleClick} token={this.state.keycloak.token}/>    
					</Sidebar>
					<Content>
						{table}
					</Content>
				</Body>
			<Footer >
					Version No:{process.env.REACT_APP_VERSION_NUMBER} ||| Build Date: {process.env.REACT_APP_BUILD_DATE}
				</Footer>
			</div>
		);
	}
}

export default App;

