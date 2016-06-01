import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Requests, Offers } from '../../api/collections.js';
import './myRequests.html';

Template.myRequests.onCreated(function myRequestsCreated() {
  Meteor.subscribe('requests'); 
  Meteor.subscribe('offers');
});

Template.myRequests.helpers({
  requests() {
    return Requests.find({
      consumerId: Meteor.userId()
    });
  },
  offers(requestId) {
    return Offers.find({
      requestId
    });
  }
});

Template.myRequests.events({
  'click .accept-offer'() {
    Meteor.call('acceptOffer', this.transactionId, this.requestId, this._id, this.driverId, 100, this.price);
  }
});
