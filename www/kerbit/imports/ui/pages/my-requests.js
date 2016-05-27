import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Requests, Offers } from '../../api/collections.js';
import './my-requests.html';

Template.myRequests.onCreated(function myRequestsCreated() {
  Meteor.subscribe('requests'); 
});

Template.req.onCreated(function reqCreated() {
  Meteor.subscribe('offers');
});

Template.myRequests.helpers({
  requests() {
    return Requests.find({});
  }
});
Template.req.helpers({
  offers(requestId) {
    return Offers.find({
      requestId
    });
  }
});
