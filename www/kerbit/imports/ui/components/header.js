import { Template } from 'meteor/templating';

import "./header.html";

Template.nav_bar.onRendered(function() {
  this.autorun(() => {
    $('#push,secton').pushpin({ top:$('#push').height() });
  });
});

Template.nav_bar.helpers({
  currentUserIsDriver() {
    return Meteor.user() && Meteor.user().profile.isDriver;
  }
});
