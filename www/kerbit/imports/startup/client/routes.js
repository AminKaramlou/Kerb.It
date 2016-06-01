import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { AccountsTemplates } from 'meteor/useraccounts:core';

import '../../ui/pages/';
import '../../ui/layouts/';

FlowRouter.route('/', {
  name: 'Home',
  action: function() {
    BlazeLayout.render('HomeLayout', {main: 'Home'});
  }
});

FlowRouter.route('/request-pickup', {
  name: 'RequestPickup',
  action: function() {
    BlazeLayout.render('HomeLayout', {main: 'RequestPickup'});
  }
});

FlowRouter.route('/make-offers', {
  name: 'MakeOffers',
  action: function() {
    BlazeLayout.render('HomeLayout', {main: 'MakeOffers'});
  }
});

FlowRouter.route('/my-requests', {
  name: 'MyRequests',
  action: function() {
    BlazeLayout.render('HomeLayout', {main: 'MyRequests'});
  } 
});

FlowRouter.route('/my-offers', {
  name: 'MyOffers',
  action: function() {
    BlazeLayout.render('HomeLayout', {main: 'MyOffers'});
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
