import { Template } from 'meteor/templating';

import "./sidebar.html";

Template.side_bar.helpers({
  currentUserIsDriver: function() {
    return Meteor.user() && Meteor.user().profile.isDriver;
  },
  fullName: function() {
    return Meteor.user() && toTitleCase(Meteor.user().profile.first_name + " " + Meteor.user().profile.last_name);
  }

});

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
