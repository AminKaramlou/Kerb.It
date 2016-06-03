import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../api/collections/images.js';

import '../../api/methods.js';
import "./requestPickup.html";

Template.RequestPickup.events({
  'change #file' (event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#image').attr('src', e.target.result);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  },
  
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;

    const description = target.description.value;
    const bidWindow = Number(target.bidWindow.value);
    const sizeRequired = Number(target.sizeRequired.value);
    const postcode = target.postcode.value;
    const image = target.file.files[0];

    function getCurrentCenter() {
      var currentCenter = new google.maps.LatLng(Template.map.getCenter());
    }
    const imageId = Images.insert(image)._id;
    console.log(imageId);
    Meteor.call('makeRequest', Meteor.userId(), imageId, description, bidWindow, sizeRequired, postcode);
    target.reset();
  }
});
