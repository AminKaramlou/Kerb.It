import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Requests } from '../../api/collections/requests.js';
import { Offers } from '../../api/collections/offers.js';
import { Transactions } from '../../api/collections/transactions.js';
import { Images } from '../../api/collections/images.js'
import './myOffers.html';

Template.MyOffersHelper.onCreated(function myRequestsCreated() {
  Meteor.subscribe('requests'); 
  Meteor.subscribe('offers');
  Meteor.subscribe('transactions');
  Meteor.subscribe('images');
});

Template.MyOffersHelper.helpers({
  images(imageIds) {
    return Images.find({_id: {$in: imageIds}});
  },

  offers() {
    return Offers.find({
      driverId: Meteor.userId()
    });
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
  'click .tab-links button'() {
    const target = event.target;
    const name = target.name;
    $(name).show().siblings().hide();
    $(target).parent('li').addClass('active').siblings().removeClass('active');
  },
  'submit form'(event) {
    event.preventDefault();
    const target = event.target;

    const offerId = target.id.value;
    const price = Number(target.price.value);

    Meteor.call('updateOffer', offerId, price);
    target.reset();
  }
});
