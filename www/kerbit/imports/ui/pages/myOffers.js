import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Requests, Offers } from '../../api/collections.js';
import './myOffers.html';

Template.MyOffers.onCreated(function myRequestsCreated() {
  Meteor.subscribe('requests'); 
  Meteor.subscribe('offers');
});

Template.MyOffers.helpers({
  offers() {
    return Offers.find({
      driverId: Meteor.userId()
    });
  },
  requests(requestId) {
    return Requests.find(requestId);
  }
});
