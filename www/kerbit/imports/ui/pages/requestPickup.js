import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../../api/methods.js';
import "./requestPickup.html";

Template.RequestPickup.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;

    const title = target.title.value;
    const description = target.description.value;
    const bidWindow = Number(target.bidWindow.value);
    const sizeRequired = Number(target.sizeRequired.value);
    const postcode = target.postcode.value;

    function getCurrentCenter() {
      var currentCenter = new google.maps.LatLng(Template.map.getCenter());
    }

    Meteor.call('makeRequest', Meteor.userId(), description, bidWindow, sizeRequired, postcode);
    target.reset();
  }
});
