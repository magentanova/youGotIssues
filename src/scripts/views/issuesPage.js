import React from 'react'

import IssueForm from './issueForm.js'
import STORE from '../store.js'
import ACTIONS from '../actions.js'
// es5 way of creating react components

const IssuesPage = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchAllIssues()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},

	getInitialState: function() {
		return STORE.data
	},

	 render: function() {
	 	
	 	return (
	 		<div className='issues-page' >
	 			<h1>You Got Issues!</h1>
	 			<IssueForm />
	 			<IssuesList issueCollection={this.state.issueCollection} />
	 		</div>
	 	)
 	}
})

const IssuesList = React.createClass({
	_makeIssue: function(model) {
		return <Issue issueModel={model} key={model.cid} />
	},

	render: function() {
		return (
			<div className="issues-list">
				{this.props.issueCollection.map(this._makeIssue)}
			</div>
			)
	}
})

const Issue = React.createClass({
	render: function() {
		return (
			<div className="issue-container">
				<h3 className="issue-text">
					{this.props.issueModel.get('relationshipIssue')}
				</h3>
				<p className="poster-name">
					posted by {this.props.issueModel.get('userName')} 
					<span>
						&nbsp;who is {this.props.issueModel.get('relationshipStatus')}
					</span>
				</p>
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




// for IssuesPage, React.createClass is the 
// same as ... 

// es6 way of creating them...

class IssuesPage2 extends React.Component {
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
// class MarriedPeopleIssues extends IssuesPage2 {

// }


// it's also very fashionable to write "dumb" components as "pure functions"

function DumbComponent(props) {
	return <p>{props.name + ' is dumb'}</p>
}

export default IssuesPage
