import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Requests } from '../../api/collections/requests.js';
import { Offers } from '../../api/collections/offers.js';
import { Transactions } from '../../api/collections/transactions.js';
import { Images } from '../../api/collections/images.js'
import { Items } from '../../api/collections/items.js'
import './myOffers.html';

Template.MyOffersHelper.onCreated(function myRequestsCreated() {
  Meteor.subscribe('requests'); 
  Meteor.subscribe('offers');
  Meteor.subscribe('transactions');
  Meteor.subscribe('images');
  Meteor.subscribe('items');
});

Template.MyOffersHelper.onRendered(function myRequestsCreated() {
  $(document).ready(function() {
    $('ul.tabs').tabs();
  });
});

Template.MyOffersHelper.helpers({
  ImageWithIds(imageIds) {
    return Images.find({_id: {$in: imageIds}});
  },
  ItemWithId(itemId) {
    return Items.find(itemId);
  },
  offers() {
    return Offers.find({
      driverId: Meteor.userId()
    });
  },
  offerWithOfferId(offerId) {
    return Offers.find(offerId);
  },
  requests(requestId) {
    return Requests.find(requestId);
  },
  transactions() {
    return Transactions.find({
      driverId: Meteor.userId()
    });
  },

});

Template.MyOffersHelper.events({
  'submit form'(event) {
    event.preventDefault();
    const target = event.target;

    const offerId = target.id.value;
    const price = Number(target.price.value);

    Meteor.call('updateOffer', offerId, price);
    target.reset();
  }
});
