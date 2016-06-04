import { Template } from 'meteor/templating';

import "./sidebar.html";

Template.side_bar.onRendered(function() {
  this.autorun(() => {
    $(".button-collapse").sideNav({
      menuWidth: 240,
      edge: 'right',
      closeOnClick: true  
    });
  });
});

Template.side_bar.helpers({
  currentUserIsDriver() {
    return Meteor.user() && Meteor.user().profile.isDriver;
  },
  fullName() {
    return Meteor.user() && toTitleCase(Meteor.user().profile.first_name + " " + Meteor.user().profile.last_name);
  },
  groupRoutes() {
    FlowRouter.watchPathChange();
    const group= FlowRouter.current().route.group;
    return _.filter(FlowRouter._routes, function(route) {
      if (route.name === 'Home') {
        return false;
      } 
      for(let currGroup = group; !!currGroup; currGroup = currGroup.parent) {
        if (route.group && currGroup.name === route.group.name) {
          return true;
        }
      }
      return false
    });
  }
});

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
