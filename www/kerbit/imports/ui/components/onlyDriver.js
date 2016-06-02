import { Template } from 'meteor/templating';

import './onlyDriver.html';

Template.OnlyDriver.helpers({
  authInProcess: function() {
    return Meteor.loggingIn();
  },
  canShow: function() {
    return Meteor.user().profile.isDriver;
  }
});
