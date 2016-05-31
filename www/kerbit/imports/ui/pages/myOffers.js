import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Requests } from '../../api/schemas/request.js'
import { Offers } from '../../api/schemas/offer.js'
import './myOffers.html';

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
