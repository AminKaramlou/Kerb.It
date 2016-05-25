import { Meteor } from 'meteor/meteor';

Markers = new Mongo.Collection('markers');

Meteor.startup(() => {
  // code to run on server at startup
});
