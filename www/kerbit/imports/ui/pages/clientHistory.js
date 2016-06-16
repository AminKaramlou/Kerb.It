import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Transactions } from '../../api/collections/transactions.js';
import { Items } from '../../api/collections/items.js';
import './clientHistory.html';
import '../components/transaction.html';

Template.ClientHistoryHelper.onCreated(function () {
  Meteor.subscribe('transactions');
  Meteor.subscribe('items');
});

Template.ClientHistoryHelper.rendered = function () {
  $('.modal-trigger').leanModal();
  $('.collapsible').collapsible({
    accordion: true
  });
};

Template.ClientHistoryHelper.helpers({
  transactions() {
    console.log(Transactions.find().fetch());
    return Transactions.find({
    });
  },
  getItem(itemId) {
    return Items.findOne(itemId);
  }
});

Template.ClientHistoryHelper.events({
  // 'click .more-details'(event) {
  //   event.preventDefault();
  //   alert('Todo');
  // }
});


