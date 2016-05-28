import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Requests } from '../../api/collections.js';
import '../../api/methods.js';
import "./makeOffers.html";

Template.makeOffers.onCreated(function driverHomeOnCreated() {
  Meteor.subscribe('requests');
});

Template.makeOffers.helpers({
  requests() {
    return Requests.find({});
  }
});

Template.makeOffers.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const price = Number(target.price.value);
    //console.log(target.requestId);
    let requestId;
    for (var i in target.requestId) {
     // console.log(true);
      //console.log(target.requestId[i]);
      if (target.requestId[i].checked) {
        console.log(target.requestId[i]);
        requestId = String(target.requestId[i].value);
      }
    }

    Meteor.call('makeOffer', requestId, Meteor.userId(), price);
    target.reset();
  }
});
