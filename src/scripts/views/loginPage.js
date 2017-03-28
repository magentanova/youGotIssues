import React from 'react'

import ACTIONS from '../actions.js'
import Banner from './banner.js'

const LoginPage = React.createClass({
	 render: function() {
	 	return (
	 		<div className='login-page' >
	 			<Banner />
	 			<h2>Register</h2>
	 			<RegisterForm />
	 			<h2>Log In</h2>
	 			<LoginForm />
	 		</div>
	 	)
 	}
})

const RegisterForm = React.createClass({
	_handleSubmit: function(evtObj) {
		evtObj.preventDefault()
		var formEl = evtObj.target,
			userData = {
				name: formEl.yourName.value,
				email: formEl.email.value,
				password: formEl.password.value
			}
		ACTIONS.registerUser(userData)
	},

	render: function() {
		return (
			<form onSubmit={this._handleSubmit} className='form-group register-form' >
					<input 
						className="mt-1 form-control"
						type="text" 
						name="yourName"
						placeholder="enter your name"
						 />
					 <input 
						className="mt-4 form-control"
					 	type="text" 
					 	name="email"
					 	placeholder="enter your email"
					 	 />
					<input 
						className="my-1 form-control"
						type="password" 
						name="password" 
						placeholder="enter your password"
						/>
				<button className="btn btn-primary col-sm-3" type="submit">submit</button>
			</form>
			)
	}
})


const LoginForm = React.createClass({
	_handleSubmit: function(evtObj) {
		evtObj.preventDefault()
		ACTIONS.logUserIn(evtObj.target.email.value, evtObj.target.password.value)
	},

	render: function() {
		return (
			<form onSubmit={this._handleSubmit} className='form-group register-form' >
					 <input 
						className="mt-4 form-control"
					 	type="text" 
					 	name="email"
					 	placeholder="enter your email"
					 	 />
					<input 
						className="my-1 form-control"
						type="password" 
						name="password" 
						placeholder="enter your password"
						/>
				<button className="btn btn-primary col-sm-3" type="submit">submit</button>
			</form>
			)
	}
})

export default LoginPage
