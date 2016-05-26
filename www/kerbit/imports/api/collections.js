import { Mongo } from 'meteor/mongo';

export const Drivers = new Mongo.Collection('drivers');
export const Consumers = new Mongo.Collection('consumers');
export const Requests = new Mongo.Collection('requests');
export const Offers = new Mongo.Collection('offers');
export const Transactions = new Mongo.Collection('transactions');
export const Markers = new Mongo.Collection('markers');

if (Meteor.isServer) {
  Meteor.publish('drivers', function driversPublication() {
    return Drivers.find({});
  });
  Meteor.publish('consumers', function consumersPublication() {
    return Consumers.find({});
  });
  Meteor.publish('requests', function requestsPublication(){
    return Requests.find({});
  });
  Meteor.publish('offers', function offersPublication(){
    return Offers.find({});
  });
  Meteor.publish('transactions', function transactionsPublication() {
    return Transactions.find({});
  });
  Meteor.publish('markers', function markersPublication() {
    return Markers.find({});
  });
}
