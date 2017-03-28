import React from 'react'

import IssuesContainer from './issuesContainer.js'
import Banner from './banner.js'

import STORE from '../store.js'
import ACTIONS from '../actions.js'
// es5 way of creating react components

const AllIssuesPage = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchIssues()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},

	componentWillUnmount: function() {
		STORE.off('dataUpdated')
	},

	getInitialState: function() {
		return STORE.data
	},

	 render: function() {
	 	
	 	return (
	 		<div className='issues-page' >
		 		<Banner />
	 			<h2>showing all issues</h2>
	 			<IssuesContainer issueCollection={this.state.issueCollection} />
	 		</div>
	 	)
 	}
})


// can also do this...
// function Issue(props) {
// 	return (
// 		<div>
// 		</div>
// 		)
// }




// for AllIssuesPage, React.createClass is the 
// same as ... 

// es6 way of creating them...

class AllIssuesPage2 extends React.Component {
	//`constructor` here means the function that runs when you first create
	// a new instance of this class.
	constructor(props) {
		// `super` references the constructor of the parent/"extended" component 
		super(props)
		// this line replaces the .getInitialState() method.
		this.state = STORE.data
	}
	componentWillMount() {
		STORE.on('dataUpdated', ()=>{
			this.setState(STORE.data)
		})
	}
	render() {
		return (
			<div className="issues-page">
			</div>
			)
	}
}

// // it's a lot of syntactic sugar, but it does have one advantage:
// // it's a convenient syntax when we want to create inheritance relationships.
// class MarriedPeopleIssues extends AllIssuesPage2 {

// }


// it's also very fashionable to write "dumb" components as "pure functions"

function DumbComponent(props) {
	return <p>{props.name + ' is dumb'}</p>
}

export default AllIssuesPage
