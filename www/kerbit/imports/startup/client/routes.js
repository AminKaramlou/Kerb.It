import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import '../../ui/pages/';
import '../../ui/layouts/';

var isDriver = function() {
  return Meteor.user() && Meteor.user().profile.isDriver;
};

var isNotConsumer = function () {
  return (isDriver());
};

var isNotDriver = function () {
  return (!isDriver());
};

var consumerSection = FlowRouter.group({
  triggersEnter: [
    function() {
      if( isNotConsumer() ){
        FlowRouter.go('Home');
      } 
    }
]});

var driverSection = FlowRouter.group({
  triggersEnter: [
    function() {
      if( isNotDriver() ) {
        FlowRouter.go('Home');
      } 
    }
]});

Accounts.onLogin(function() {
  FlowRouter.go('Home');
});

Accounts.onLogout(function() {
  FlowRouter.go('Home');
});

FlowRouter.route('/', {
  name: 'Home',
  action: function() {
    if(!Meteor.userId()) {
      BlazeLayout.render('HomeLayout', {main: 'Home'});
    } else if ( !isDriver() ) {
      FlowRouter.go('ClientHistory');
    } else if ( isDriver() ) {
      FlowRouter.go('DriverHistory');
    }
  }
});

FlowRouter.route('/settings', {
  name: 'Settings',
  action: function() {
    if(!Meteor.userId()) {
      BlazeLayout.render('HomeLayout', {main: 'Home'});
    } else {
      BlazeLayout.render('DashLayout', {main: 'accountSettings'});
    }
  }
});

consumerSection.route('/history', {
  name: 'ClientHistory',
  action: function() {
    BlazeLayout.render('DashLayout', {main: 'client_history'});
  }
});

driverSection.route('/history', {
  name: 'DriverHistory',
  action: function() {
    BlazeLayout.render('DashLayout', {main: 'driver_history'});
  }
});


consumerSection.route('/request-pickup', {
  name: 'RequestPickup',
  action: function() {
    BlazeLayout.render('DashLayout', {main: 'RequestPickup'});
  }
});

consumerSection.route('/my-requests', {
  name: 'MyRequests',
  action: function() {
    BlazeLayout.render('DashLayout', {main: 'MyRequests'});
  } 
});

driverSection.route('/make-offers', {
  name: 'MakeOffers',
  action: function() {
    BlazeLayout.render('DashLayout', {main: 'MakeOffers'});
  }
});




driverSection.route('/my-offers', {
  name: 'MyOffers',
  action: function() {
    BlazeLayout.render('DashLayout', {main: 'MyOffers'});
  } 
});

process.env.MAIL_URL ='';

AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn', {
    name: 'Signin',
    path: '/login',
    template: 'login',
    layoutTemplate: 'HomeLayout',
    redirect: '/request-pickup',
    contentRegion: 'main'
});
AccountsTemplates.configureRoute('signUp', {
    name: 'Signup',
    path: '/register',
    template: 'register',
    layoutTemplate: 'HomeLayout',
    redirect: '/',
    contentRegion: 'main'
});

AccountsTemplates.configureRoute('verifyEmail');

FlowRouter.notFound = {
  action: function () {
    BlazeLayout.render('NotFound');
  }
};
