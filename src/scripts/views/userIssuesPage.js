//libraries/frameworks
import React from 'react'

//react components
import IssuesContainer from './issuesContainer.js'
import Banner from './banner.js'

//other modules
import STORE from '../store.js'
import ACTIONS from '../actions.js'

const UserIssuesPage = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchIssuesByUser(this.props.userId)
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
	 			<h2>showing user's issues</h2>
	 			<IssuesContainer issueCollection={this.state.issueCollection} />
	 		</div>
	 	)
 	}
})


export default UserIssuesPage
