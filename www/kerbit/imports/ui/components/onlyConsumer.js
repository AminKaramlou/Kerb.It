import { Template } from 'meteor/templating';

import './onlyConsumer.html';

Template.OnlyConsumer.helpers({
  authInProcess: function() {
    return Meteor.loggingIn();
  },
  canShow: function() {
    return Meteor.user() && (! Meteor.user().profile.isDriver);
  }
});
