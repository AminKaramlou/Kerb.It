import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Transactions } from '../../api/collections/transactions.js';
import { Images } from '../../api/collections/images.js';
import './clientHistory.html';
import '../components/transaction.html';

Template.ClientHistoryHelper.onCreated(function () {
  Meteor.subscribe('transactions');
  Meteor.subscribe('users');
});

Template.ClientHistoryHelper.helpers({

  images(imageIds) {
    return Images.find(imageIds);
  },

  pending() {
    return Transactions.find({
      consumerId: Meteor.userId(),
      isCollected: false
    });
  },

  getPendingCount() {
    var trans = Transactions.find({
      consumerId: Meteor.userId(),
      isCollected: false
    });
    return trans.count();
  },
  
  getIsZero() {
    return (getPendingCount() == 0);
  },
  getIsOne() {
    return (getPendingCount() == 1);
  },

  getDriverName(driverId) {
    var user= Meteor.users.findOne(driverId);
    return user.username;
  },

  hasFeedback(transId) {
    var trans= Transactions.findOne(transId);
    return trans.hasLeftFeedback;
  },

  transactions() {
    return Transactions.find({
      consumerId: Meteor.userId(),
      isCollected: true
    });
  }
});

Template.ClientHistoryHelper.events({
  'click .ratingButton'(event) {
    event.preventDefault();
    var rating = $('#rating').data('userrating');
    Meteor.call('rateDriver', this.driverId, rating);
    Meteor.call('leaveFeedback', this._id,rating);
  },
  'click .collect'(event) {
    event.preventDefault();
    Meteor.call('collect', this._id);
  }
});



