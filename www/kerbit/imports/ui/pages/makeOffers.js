import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Requests } from '../../api/collections.js';
import '../../api/methods.js';
import "./makeOffers.html";

Template.MakeOffers.onCreated(function driverHomeOnCreated() {
  Meteor.subscribe('requests');
});

Template.MakeOffers.helpers({
  requests() {
    return Requests.find({});
  }
});

Template.MakeOffers.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const price = Number(target.price.value);
    let requestId;
    for (var i in target.requestId) {

      if (target.requestId[i].checked) {
        requestId = String(target.requestId[i].value);
      }
    }

    Meteor.call('makeOffer', requestId, Meteor.userId(), price);
    target.reset();
  }
});
