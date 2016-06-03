import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Transactions } from '../../api/collections/transactions.js';
import './clientHistory.html';
import '../components/transaction.html';

Template.ClientHistoryHelper.onCreated(function () {
  Meteor.subscribe('transactions'); 
});

Template.ClientHistoryHelper.helpers({
  transactions() {
    return Transactions.find({
      consumerId: Meteor.userId()
    });
  }
});

