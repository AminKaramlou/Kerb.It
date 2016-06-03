import { Meteor } from 'meteor/meteor';
import './clientHistory.html';

Template.ClientHistoryHelper.onCreated(function () {
  Meteor.subscribe('transactions'); 
});
