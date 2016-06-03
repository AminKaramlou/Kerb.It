import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Transactions } from '../../api/collections/transactions.js';
import { Images } from '../../api/collections/images.js';
import { Transactions } from '../../api/collections/transactions.js';
import { Template } from 'meteor/templating';
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
      consumerId: Meteor.userId()
    });
  },

  getDriverName(driverID) {
    return "Dummy Name";
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



