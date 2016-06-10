import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../api/collections/images.js';

import '../../api/methods.js';
import "./requestPickup.html";

Template.RequestPickupHelper.onCreated(function(){
  var self = this;

  GoogleMaps.ready('map', function(map) {
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    input.hidden = false;
    map.instance.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      map.instance.setCenter(places[0].geometry.location);
    });


      self.map = new ReactiveVar(map);
  });
});

Template.RequestPickupHelper.events({
  'change #file' (event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#image').attr('src', e.target.result);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  },

  'submit form'(event,template) {
    event.preventDefault();
    const target = event.target;

    const description = target.description.value;
    const bidWindow = Number(target.bidWindow.value);
    const sizeRequired = Number(target.sizeRequired.value);

    const images = target.clientImage.files;
    let imageIds = new Array();
    for (i = 0; i < images.length; i++) {
      imageIds.push(Images.insert(images[i])._id);
    }
    const position = template.map.get().instance.getCenter();

    Meteor.call('makeRequest', Meteor.userId(), imageIds, description, bidWindow,
      sizeRequired, position.lng(), position.lat());
    target.reset();
  }
});
