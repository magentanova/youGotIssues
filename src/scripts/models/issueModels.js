import Backbone from 'backbone'

export const IssueModel = Backbone.Model.extend({

})

export const IssueCollection = Backbone.Collection.extend({
	model: IssueModel
})