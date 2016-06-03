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

  images(imageId) {
    return Images.find(imageId);
  },

  pending() {
    return Transactions.find({
      consumerId: Meteor.userId(),
      isCompleted: false
    });
  },

  getPendingCount() {
    var trans= Transactions.find({
      consumerId: Meteor.userId(),
      isCompleted: false
    });
    return trans.count();
  },

  getDriverName(driverId) {
    var user= Meteor.users.findOne(driverId);
        return user.username;
  },

  formatDate(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November",
      "December"];
    return date.getDate() + " " + monthNames[date.getMonth()] + ", " +
        date.getFullYear() + " at " + date.getHours()  + ":" +
        date.getMinutes() ;
  },
  formatPostcode(postcode) {
    const format = postcode.substring(0,2) + " " + postcode.substring(2);
    return format.toUpperCase();
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
  },
  'click .collect'(event) {
    event.preventDefault();
    Meteor.call('collect', this._id);
  }
});



