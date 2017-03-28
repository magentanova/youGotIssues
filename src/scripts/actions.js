import STORE from './store.js'
import {IssueModel} from './models/issueModels.js'
import User from './models/userModel.js'

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
				function(response) { // SUCCESS
					alert('saved one for ya!')
					ACTIONS.fetchAllIssues()
				},
				function(err) { // FAILURE
					alert('problem saving your issue!')
					console.log(err)
				}
			)
	},

	addLike: function(model) {
		model.set({
			likes: model.get('likes') + 1
		})
		model.save() // since the model is old, i.e. it already 
		// has an id, backbone will send a PUT request here instead 
		// of a POST request
		// AND, since the model has a urlRoot and an idAttribute,
		// backbone will anticipate our needs and stick the model's _id
		// onto the end of the url. 
			.done(function(resp) {
				console.log(resp)
				ACTIONS.fetchAllIssues()
			})
			.fail(function(err) {
				alert('couldn\'t register your like')
				console.log(err)
			})
	},

	deleteMod: function(model) {
		model.destroy()
			.done(ACTIONS.fetchAllIssues)
			.fail(
				function(err) {
					alert('problem deleting your model!')
					console.log(err)
				})
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
	},

	logout: function() {
		User.logout()
			.done(
				function(resp) {
					alert('you logged out!')
					location.hash = 'login'
				})
			.fail(
				function(err) {
					alert('error logging out!')
					console.log(err)
				})
	},

	logUserIn: function(email,password) {
		User.login(email,password)
			.done(
				function(resp) {
					alert('logged in!')
					console.log(resp)
					location.hash = 'issues/all'
				}
			)
			.fail(
				function(err) {
					alert('problem logging in!')
					console.log(err)
				})
	},

	registerUser: function(userData) {
		User.register(userData)
			.done(
				//success function
				function(resp) {
					alert(`new user ${resp.email} registered`)
					console.log(resp)
					ACTIONS.logUserIn(userData.email, userData.password)
				}
				)
			.fail(
				function(err) {
					alert('problem registering user!')
					console.log(err)
				}
				)
	}
}

export default ACTIONS