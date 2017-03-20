import React from 'react'

const IssueForm = React.createClass({
	_handleSubmit: function(eventObj) {
		// a form will fire a submit event if either
			// (a) the user presses enter inside one if its inputs or
			// (b) it contains a button with type="submit", and that button is clicked

		eventObj.preventDefault()
		// prevent the submit event from making its own request
		var formEl = eventObj.target
		var enteredData = {
			userName: formEl.theirName.value,
			relationshipStatus: formEl.status.value,
			relationshipIssue: formEl.issue.value
		}
		if (this._validate(enteredData)) {
			// do something
		}
		console.log(enteredData)
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
	 			</select>
	 			<input name="issue" type="text" placeholder="what issue you got?" />
	 			<button type="submit">post my issue!</button>
	 		</form>
	 	)
 	}
})

export default IssueForm
