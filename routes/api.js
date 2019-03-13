/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';
const mongoose = require('mongoose')
var expect = require('chai').expect;
var ObjectId = require('mongodb').ObjectID;


mongoose.connect(process.env.MLAB_URI )
var Schema = mongoose.Schema;
var issueSchema = new Schema({
  "project": {
    type: String,
    required: true
  },
  "issue_title":{
    type: String,
    required: true
  },
  "created_by":{
    type: String,
    required: true
  },
  "assigned_to":{
    type: String,
    required: true
  },
  "status_text":{
    type: String,
    required: true
  },
  "created_on":Date,
  "updated_on":Date,
  "open":Boolean
});
var Issue = mongoose.model('Issue', issueSchema);
//var issue = new Issue({"project":"cool", "issue_title":"something","created_by":"lakshya","assigned_to":"jg","status_text":"Tell me"});
//issue.save();

//Sample front-end

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
      
    })
    
    .post(function (req, res){
      var project = req.params.project;
      var today = new Date(); 
      var issue = new Issue({"project":project, "issue_title":req.body.issue_title,"created_by":req.body.issue_text,"assigned_to":req.body.created_by,"status_text":req.body.status_text,"created_on":today.getDate(), "updated_on":today.getDate(), "open":true});
      issue.save((err,data)=>{
        console.log(data);
        res.json(data);
      });
    })
    
    .put(function (req, res){
      var project = req.params.project;
      
      var issue_title, created_by, assigned_to, status_text, updated_on, open;
      var o = {};
    
      var today = new Date()
      Issue.findOne({_id:ObjectId(req.body._id)},(err,data)=>{
        
        if(err){
          res.send('could not update '+req.body._id);
        }
      
        issue_title=req.body.issue_title||data.issue_title;
        created_by=req.body.created_by||data.created_by;
        assigned_to = req.body.assigned_to||data.assigned_to;
        status_text=req.body.status_text||data.status_text;
        updated_on=today;
        open = req.body.open;
        
        
        o = {"project":project, "issue_title":issue_title,"created_by":created_by,"assigned_to":assigned_to,"status_text":status_text, "updated_on":updated_on, "open":open};
        Issue.findOneAndUpdate({_id:ObjectId(req.body._id)}, o, (err,data)=>{
        
          if(err){
            res.send('could not update ' +req.body._id);
          }else{
            res.send('successfully updated '+req.body._id);
          }
        
        });
      })
    
    })
    
    .delete(function (req, res){
      var project = req.params.project;
      console.log(req.body._id);
      Issue.deleteOne({_id:ObjectId(req.body._id)},(err,data)=>{
          if(err){
              res.send('could not delete'+req.body._id);
          }else{
            console.log('deleted');
            res.send( 'deleted '+req.body._id);
          }
      });
      
    });
    
};
