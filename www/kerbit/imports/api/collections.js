import { Mongo } from 'meteor/mongo';

export const Requests = new Mongo.Collection('requests');
export const Offers = new Mongo.Collection('offers');
export const Transactions = new Mongo.Collection('transactions');
export const Markers = new Mongo.Collection('markers');
export const Players = new Mongo.Collection('players');

if (Meteor.isServer) {
  Meteor.publish('players', function playersPublication() {
    return Players.find({});
  });
  Meteor.publish('requests', function requestsPublication() {
    if (Meteor.users.findOne(this.userId).profile.isDriver) {
      return Requests.find({});
    }
    return Requests.find({ 
      consumerId: this.userId
    });
  });
  Meteor.publish('offers', function offersPublication() {
    return Offers.find({
      $or: [
        { consumerId: this.userId },
        { driverId: this.userId }
      ]
    });
  });
  Meteor.publish('transactions', function transactionsPublication() {
    return Transactions.find({});
  });
  Meteor.publish('markers', function markersPublication() {
    return Markers.find({});
  });
}
