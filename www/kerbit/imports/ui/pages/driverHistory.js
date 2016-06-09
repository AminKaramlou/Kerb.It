import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Transactions } from '../../api/collections/transactions.js';
import './driverHistory.html';
import '../components/transaction.html';

Template.DriverHistoryHelper.onCreated(function () {
  Meteor.subscribe('transactions'); 
});

Template.DriverHistoryHelper.onRendered(function () {
  $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion: true
    });
  });
});

Template.DriverHistoryHelper.helpers({
  transactions() {
    return Transactions.find({
      driverId: Meteor.userId()
    });
  }
});

