import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../../api/methods.js';
import "./makeOffers.html";

Template.makeOffers.onCreated(function driverHomeOnCreated() {
  Meteor.subscribe('requests');
});

Template.makeOffers.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const price = Number(target.price.value);
    Meteor.call('makeOffer', "7rewJg6Ro9SS36eaL", Meteor.userId(), price);
  }
});
