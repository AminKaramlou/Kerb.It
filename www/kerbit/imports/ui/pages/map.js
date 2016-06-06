import "./map.html";
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../../api/methods.js';

Meteor.startup(function() {
  GoogleMaps.load( { key: 'AIzaSyBnvwhKrpFJ_r1_7zl0p4NZ07tmNvXm9MU', libraries: 'geometry,places'});
});
Template.map.onCreated(function (){

  GoogleMaps.ready('map', function(map) {
    if (navigator.geolocation) {
      browserSupportFlag = true;
      navigator.geolocation.getCurrentPosition(function (position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.instance.setCenter(initialLocation);
      });
    }
  });
});


Template.map.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {

      return {
        center: new google.maps.LatLng(51.5074, -0.1278),
        zoom: 15,
        minZoom: 2
      };
    }
  }

});
