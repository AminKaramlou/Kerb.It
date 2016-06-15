import { Mongo } from 'meteor/mongo';

export const Boroughs = new Mongo.Collection('boroughs');


if (Meteor.isServer) {
  Meteor.publish('Boroughs', function boroughPublication() {
    return Boroughs.find();
  });
}
