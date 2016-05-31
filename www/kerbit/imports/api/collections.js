import { Mongo } from 'meteor/mongo';

export const Markers = new Mongo.Collection('markers');

if (Meteor.isServer) {
  Meteor.publish('markers', function markersPublication() {
    return Markers.find({});
  });
}