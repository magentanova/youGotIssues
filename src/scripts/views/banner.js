import React from 'react'
import ACTIONS from '../actions.js'

import User from '../models/userModel.js'

const Banner = React.createClass({
	 render: function() {
	 	// if there's no current user, User.getCurrentUser() will return null, 
	 		// which is falsy

	 	var welcomeText = User.getCurrentUser() ? `welcome ${User.getCurrentUser().get('name')}!` : '',
	 		myIssuesLink = User.getCurrentUser() ? "#issues/user/" + User.getCurrentUser().get('_id') : ''
	 	return (
	 		<div className='banner' >
	 			<h1>You Got Issues!</h1>
	 			<ul className="nav">
	 				<li className="nav-item">
	 					<a href="#issues/all" className="nav-link">
	 						all issues
	 					</a>
	 				</li>
	 				<li className="nav-item">
	 					<a href={myIssuesLink} className="nav-link">
	 						my issues
	 					</a>
	 				</li>
	 				<li className="nav-item">
	 					<a href="#login" className="nav-link">
	 						sign up
	 					</a>
	 				</li>
	 				<li className="nav-item">
	 					<a onClick={ACTIONS.logout} className="disabled nav-link">
	 						log out
	 					</a>
	 				</li>
	 			</ul>
	 			<h2>
	 				{welcomeText}
	 			</h2>
	 		</div>
	 	)
 	}
})

export default Banner
