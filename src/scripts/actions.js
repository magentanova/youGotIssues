import STORE from './store.js'
import {IssueModel} from './models/issueModels.js'

const ACTIONS = {
	addIssue: function(issueData) {

		var newIssue = new IssueModel(issueData) // creates a 
			// new instance of IssueModel, setting the issueData
			// from the form as its .attributes. this data (username, 
			// status, etc.) is what backbone will put into the body
			// of the post request when we use .save()

		newIssue.save() // backbone will here submit a post request
			// on our behalf.
			.then(
				// .then can actually take two callbacks, one to 
					// handle a good response, and one to handle
					// an error.
				function(response) {
					console.log(response)
					alert('saved one for ya!')
					ACTIONS.fetchAllIssues()
				},
				function(err) {
					alert('problem saving your issue!')
					console.log(err)
				}
			)
	},

	fetchAllIssues: function() {
		var issueColl = STORE.get('issueCollection')
		// backbone && jquery, on our behalf, will add a "GET" 
		// verb to the header of our request when we use 
		// .fetch()
		issueColl.fetch()
			.then(function() {
				STORE.set({
					issueCollection: issueColl
				})
			})
	}
}

export default ACTIONS