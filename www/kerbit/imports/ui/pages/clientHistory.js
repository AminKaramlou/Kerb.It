import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Transactions } from '../../api/collections/transactions.js';
import './clientHistory.html';
import '../components/transaction.html';

Template.ClientHistoryHelper.onCreated(function () {
  Meteor.subscribe('transactions');
  Meteor.subscribe('users');
});

Template.ClientHistoryHelper.helpers({
  transactions() {
    return Transactions.find({
      consumerId: Meteor.userId()
    });
  }
});

Template.ClientHistoryHelper.events({
  'click .ratingButton'(event) {
    event.preventDefault();
    var rating = $('#rating').data('userrating');
    Meteor.call('rateDriver', this.driverId, rating);
  }
});
