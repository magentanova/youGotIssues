import STORE from './store.js'


const ACTIONS = {
	addIssue: function(issueData) {
		// add this issue to the store's issueCollection
		var issueColl = STORE.get('issueCollection')
		issueColl.add(issueData)
		// set the modified collection on the store, so that
			// we broadcast the change
		STORE.set({
			issueCollection: issueColl
		})
	}
}

export default ACTIONS