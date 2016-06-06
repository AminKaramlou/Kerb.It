import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../api/collections/images.js';

import '../../api/methods.js';
import "./requestPickup.html";

Template.RequestPickupHelper.onCreated(function(){
  var self = this;
  GoogleMaps.ready('map', function(map) {
    var input = document.getElementById('pac-input');
    console.log(input);
    var searchBox = new google.maps.places.SearchBox(input);
    input.removeAttribute('hidden');
    map.instance.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      console.log(places[0].geometry.viewport.getCenter());
      map.instance.setCenter(places[0].geometry.viewport.getCenter())
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

    const image = target.file.files[0];
    const imageId = Images.insert(image)._id;

    const position = template.map.get().instance.getCenter();
    const loc = { type: "Point", coordinates: [ position.lng(), position.lat() ] };

    Meteor.call('makeRequest', Meteor.userId(), imageId, description, bidWindow,
      sizeRequired, loc);
    target.reset();
  }
});