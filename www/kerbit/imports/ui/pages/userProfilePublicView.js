import './userProfilePublicView.html'
import { UserImages } from '../../api/collections/userImages.js';

Template.ViewUser.onCreated(function () {
  Meteor.subscribe('users');
  Meteor.subscribe('userImages');
  var userName = FlowRouter.getParam("userName");

  user = Meteor.users.findOne({'username': userName});

});

var user;

Template.ViewUser.onRendered(function () {
var userName = FlowRouter.getParam("userName");

  user = Meteor.users.findOne({'username': userName});

});

Template.ViewUserHelper.onCreated(function () {
  var userName = FlowRouter.getParam("userName");
  Meteor.subscribe('users');
  user = Meteor.users.findOne({'username': userName});
});

Template.ViewUser.helpers({
  isAUser() {
    return !(user == null);
  }
});

Template.ViewUserHelper.helpers({
  isAUser() {
    return !(user == null);
  },

  getImage()  {
    if (user.imageId == "") {
      return "/profile-placeholder.png";
    } else {
      return (UserImages.findOne(user.imageId));
    }
  },

  getName() {
    return (user.profile.first_name + ' ' + user.profile.last_name);
  },
  getUsername() {
    return user.username;
  },
  getFeedbackScore() {
    return user.rating;
  },
  isDriver()  {
    return user.profile.isDriver();
  }
});
