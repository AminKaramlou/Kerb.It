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


function getPending()  {
  return Transactions.find({
      consumerId: Meteor.userId(),
      isCompleted: false
    });
}

Template.ClientHistoryHelper.helpers({

  images(imageIds) {
    return Images.find(imageIds);
  },

  pending() {
    return getPending();
  },


  
  getIsZero() {
    return (getPending().count() == 0);
  },
  getIsOne() {
    return (getPending().count() == 1);
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
      isCompleted: true
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



