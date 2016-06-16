import './userProfilePublicView.html'
import { UserImages } from '../../api/collections/userImages.js';

Template.ViewUser.onCreated(function () {
  var userName = FlowRouter.getParam("userName");
  self.user = new ReactiveVar();
  Meteor.subscribe('users', function() {
    self.user.set(Meteor.users.findOne({'username': userName}));
  });
  Meteor.subscribe('userImages');
});

Template.ViewUserHelper.onCreated(function () {
  var userName = FlowRouter.getParam("userName");
  self.user = new ReactiveVar();
  Meteor.subscribe('users', function() {
    self.user.set(Meteor.users.findOne({'username': userName}));
  });
  Meteor.subscribe('userImages');
});

Template.ViewUser.helpers({
  isAUser() {
    return !(user.get() == null);
  }
});

Template.ViewUserHelper.helpers({
  isAUser() {
    return !(user.get() == null);
  },

  getImage()  {
    if (user.get().imageId == "") {
      return "/profile-placeholder.png";
    } else {
      return (UserImages.findOne(user.get().imageId));
    }
  },

  getName() {
    return (user.get().profile.first_name + ' ' + user.get().profile.last_name);
  },
  getUsername() {
    return user.get().username;
  },
  getFeedbackScore() {
    return user.get().rating;
  },
  isDriver() {
    return user.get().profile.isDriver();
  }
});
