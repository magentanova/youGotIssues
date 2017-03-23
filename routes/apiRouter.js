const Router = require('express').Router;
const apiRouter = Router()
const helpers = require('../config/helpers.js')

const User = require('../db/schema.js').User
const Issue = require('../db/schema.js').Issue

// line 68 in our server.js tells the server to use this router
  // to handle any requests that include /api in the path
  
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){

      User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })
    })

    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

    // Routes for a Model(resource) should have this structure
    // CRUD (Create, Read, Update, Delete)
  apiRouter
    // READ MANY
    // if our server matches a GET route in the request with a /api/issues
      // route in the request url, it will run the callback function shown.
    .get('/issues', function(request, response) {
      // the first argument to find is an object that allows us to 
        // filter our request. it will only be meaningful if the
        // front-end developer included a query string in their 
        // request.
      Issue.find(request.query, function(error, records) {
        // this callback will handle the response from the database. 
          // if the query went well, error will be null and we'll 
          // get an array of records. 
          // if not, records will be null, and we'll get an error.
          if (error) {
            // here, i send a response back to the client with 
              // a bad status code, and the error structured 
              // as json
            return response.status(400).json(error)
          }
          // if we don't enter that if block, then we know 
            // we had no errors, and we can send the user
            // what they asked for.
          response.json(records)
        })
      })

      // CREATE ONE
      .post('/issues', function(request, response) {
        // a post request will include in the request body
          // the data that the client wants me to save under this 
          // collection.
          // i will make a new instance from the issue constructor, 
          // passing in the data from the request body.
        var newIssue = new Issue(request.body)
        newIssue.save(function(error, record) {
          if (error) {
            return response.status(400).json(error)
          }
          response.json(record)
        })
      })
      // DELETE is a request made for a single, pre-existing issue. 
        // 
      .delete('/issues/:issueId', function(request,response){
        Issue.remove({_id: request.params.issueId}, function(error) {
          if (error) {
            return response.status(400).json(error)
          }
          response.json({
            msg: `target with id ${request.params.issueId} has been eliminated.`,
            id: request.params.issueId
          })
        })
      })

      .put('/issues/:issueId', function(request,response) {
        // arguments, in order: the record id, the modified record, options obj, callback
        // see mongoose docs to explore this and other methods on a model.
        Issue.findByIdAndUpdate(request.params.issueId,request.body,{new: true}, function(error,record) {
          if (error) {
            console.log(response)
            return response.status(400).json(error)
          }
          response.json(record)
        })
      })

      // warmup exercise. non-working code.
      // match a GET request to /api/products. if that matches, run 
        // the callback that is the second argument.
      // .get('/products', function(request, response) {
      //   Product.find(request.query,function(error,records) {
      //     if (error) {
      //       response.status(500).json(error)
      //       return 
      //     }
      //     response.json(records)
      //   })
      // })


module.exports = apiRouter