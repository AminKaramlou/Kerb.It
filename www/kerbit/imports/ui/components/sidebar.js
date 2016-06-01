import { Template } from 'meteor/templating';

import "./sidebar.html";

Template.side_bar.helpers({
  currentUserIsDriver() {
    return Meteor.user().profile.isDriver;
  }
});
