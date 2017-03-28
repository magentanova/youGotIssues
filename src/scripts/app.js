import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'

import IssuesPage from './views/issuesPage.js'
import LoginPage from './views/loginPage.js'

const app = function() {
	const IssueRouter = Backbone.Router.extend({
		routes: {
			'issues/all': 'showAllIssues',
			'login': 'showLoginPage',
			'*default': 'redirect'
		},
		redirect: function() {
			// if a user is logged in, redirect to issues/all

			// otherwise redirect to login
		},
		showAllIssues: function() {
			ReactDOM.render(<IssuesPage />, document.querySelector('.container'))
		},
		showLoginPage: function() {
			ReactDOM.render(<LoginPage />, document.querySelector('.container'))
		}
	})

	new IssueRouter
	Backbone.history.start()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..