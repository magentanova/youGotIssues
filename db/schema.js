const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const usersSchema = new mongoose.Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  name:      { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const issueSchema = new mongoose.Schema({
	userName: { type: String, required: true },
  userId: {type: String, required: true},
	relationshipStatus: {type: String, required: true},
	relationshipIssue: {type: String, required: true},
  // likes: [{type: [String], default: []},] where this needs to go for 1 like per user
  likes: {type: Number, default: 0},
	createdAt: { type: Date, default: Date.now }
})

module.exports = {
  User: mongoose.model('User', usersSchema),
  Issue: mongoose.model('Issue', issueSchema)
}
