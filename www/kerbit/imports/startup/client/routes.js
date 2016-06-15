import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import '../../ui/pages/';
import '../../ui/layouts/';
import '../../ui/globalHelpers.js';

const publicSection = FlowRouter.group({
  name: 'publicSection'
});

const consumerSection = publicSection.group({
  name: 'consumerSection',
  prefix: '/consumer'
});

const driverSection = publicSection.group({
  name: 'driverSection',
  prefix: '/driver'
});

Accounts.onLogin(function() {
  publicSection.go('Home');
});

Accounts.onLogout(function() {
  publicSection.go('Home');
});

publicSection.route('/', {
  name: 'Home',
  action: function() {
    BlazeLayout.render('HomeLayout', {main: 'Home'});
  }
});

FlowRouter.route('/users/:userName', {
  name: "View User",
    action: function(params, queryParams) {
    BlazeLayout.render('DashLayout', {main: 'ViewUser'});
  }
});

driverSection.route('/settings', {
  name: 'DriverSettings',
  action: function() {
    BlazeLayout.render('DashLayout', {main: 'CustomSettings'});
  }
});

consumerSection.route('/settings', {
  name: 'Settings',
  action: function() {
    BlazeLayout.render('DashLayout', {main: 'CustomSettings'});
  }
});

consumerSection.route('/history-client', {
  name: 'Client History',
  action: function() {
    BlazeLayout.render('DashLayout', {main: 'ClientHistory'});
  }
});

driverSection.route('/history-driver', {
  name: 'Driver History',
  action: function() {
    BlazeLayout.render('DashLayout', {main: 'DriverHistory'});
  }
});

consumerSection.route('/request-pickup', {
  name: 'Request Pickup',
  action: function() {
    BlazeLayout.render('DashLayout', {main: 'RequestPickup'});
  }
});

consumerSection.route('/my-requests', {
  name: 'My Requests',
  action: function() {
    BlazeLayout.render('DashLayout', {main: 'MyRequests'});
  } 
});

driverSection.route('/make-offers', {
  name: 'Make Offers',
  action: function() {
    BlazeLayout.render('DashLayout', {main: 'MakeOffers'});
  }
});

driverSection.route('/my-offers', {
  name: 'My Offers',
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
    redirect: '/',
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
