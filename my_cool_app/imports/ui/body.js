import { Template } from 'meteor/templating';
import { Meteor} from 'meteor/meteor'; 
import { Tasks } from '../api/tasks.js';
 
import './body.html';
 
Template.body.helpers({
  tasks() {
    return Tasks.find({},{
	sort:{
		createdAt: -1
	}});
  },
});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
 
    // Clear form
    target.text.value = '';
  },
   'click .delete': function(){
    // code goes here
	console.log("clicked delete");
        var messId = this._id;
	console.log(messId);
	Tasks.remove(this._id);
},
  'click .deleteAll': function() 	{
	console.log("delete all");
	Meteor.call("removeAll");
	},
});
