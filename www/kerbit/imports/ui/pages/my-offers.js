import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Requests, Offers } from '../../api/collections.js';
import './my-offers.html';

Template.myOffers.onCreated(function myRequestsCreated() {
  Meteor.subscribe('requests'); 
  Meteor.subscribe('offers');
});

Template.myOffers.helpers({
  offers() {
    return Offers.find({
      driverId: Meteor.userId()
    });
  },
  requests(requestId) {
    return Requests.find(requestId);
  }
});
