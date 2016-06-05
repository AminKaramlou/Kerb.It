import { Template } from 'meteor/templating';

import "./header.html";

Template.Navbar.helpers({
  loggedIn() {
    return Meteor.userId();
  }
});
