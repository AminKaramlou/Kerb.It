import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../../api/methods.js';
import "./requestPickup.html";



function readURL(input) {
  console.log(input);
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#image').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

Template.RequestPickup.events({
  'change #file' (event) {
    readURL(event.target);
  },
  
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
