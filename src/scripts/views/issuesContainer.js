import React from 'react'

import IssueForm from './issueForm.js'

import {getRandomTransforms} from '../utils.js'
import ACTIONS from '../actions.js'
import User from '../models/userModel.js'

const IssuesContainer = React.createClass({
	render: function() {
		return (
			<div className='issues-container'>
				<IssueForm />
				<IssuesList issueCollection={this.props.issueCollection} />
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
	_handleDelete: function() {
		ACTIONS.deleteMod(this.props.issueModel)
	},

	_handleLike: function() {
		ACTIONS.addLike(this.props.issueModel)
	},

	render: function() {
		var styleObj = {transform: getRandomTransforms()}
		var deleteJSX =  <div></div> // render empty div for delete button by default
		if (User.getCurrentUser().get('_id') === this.props.issueModel.get('userId')) {
			// if this issue belongs to the current user, allow them to delete it.
			deleteJSX = <button 
							className='delete'
							onClick={this._handleDelete}>
							X
						</button>
		}
		return (
			<div style={styleObj} className="issue-container">
				<h3 className="issue-text">
					{this.props.issueModel.get('relationshipIssue')}
				</h3>
				<p className="poster-name">
					posted by <b>{this.props.issueModel.get('userName')}</b> who is
					<i>
						&nbsp;{this.props.issueModel.get('relationshipStatus')}
					</i>
				</p>
				<div className="buttons">
					{deleteJSX}
					<button 
						className="like"
						onClick={this._handleLike}>
						{this.props.issueModel.get('likes')}&nbsp;LIKES
					</button>
				</div>
			</div>
			)
	}
})

export default IssuesContainer