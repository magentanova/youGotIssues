import React from 'react'

import ACTIONS from '../actions.js'

const IssueForm = React.createClass({
	_handleSubmit: function(eventObj) {
		// a form will fire a submit event if either
			// (a) the user presses enter inside one if its inputs or
			// (b) it contains a button with type="submit", and that button is clicked

		eventObj.preventDefault()
		// prevent the submit event from making its own request
		var formEl = eventObj.target
		var issueData = {
			userName: formEl.theirName.value,
			relationshipStatus: formEl.status.value,
			relationshipIssue: formEl.issue.value
		}
		if (this._validate(issueData)) {
			// do something
		}

		ACTIONS.addIssue(issueData)
		
		formEl.reset()
	},

	_validate: function(data) {
		// give specific alerts if anything is missing or bad.

		// return true or false back into _handleSubmit()
	},

	 render: function() {
	 	return (
	 		<form onSubmit={this._handleSubmit} className='issue-form' >
	 			<input name="theirName" type="text" placeholder="your name" />
	 			<select name="status" >
	 				<option disabled>what's your status?</option>
	 				<option value="single">single</option>
	 				<option value="in a relationship">in a relationship</option>
	 				<option value="...it's complicated">it's complicated</option>
	 			</select>
	 			<input name="issue" type="text" placeholder="what issue you got?" />
	 			<button type="submit">post my issue!</button>
	 		</form>
	 	)
 	}
})

export default IssueForm
