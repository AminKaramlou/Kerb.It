import { Template } from 'meteor/templating';

import './onlyConsumer.html';

Template.OnlyConsumer.helpers({
  authInProcess: function() {
    return Meteor.loggingIn();
  },
  canShow: function() {
    return (! Meteor.user().profile.isDriver);
  }
});
