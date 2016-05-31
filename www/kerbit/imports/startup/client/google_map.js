import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../../api/methods.js';

Template.map.onCreated(function() {
  //Meteor.subscribe('markers');
  // GoogleMaps.ready('map', function(map) {
  //     google.maps.event.addListener(map.instance, 'click', function(event) {
  //         Meteor.call('addMarker', event.latLng.lat(), event.latLng.lng());
  //     });
  //     var markers = {};
  //
  //     Markers.find().observe({
  //         added: function (document) {
  //             var marker = new google.maps.Marker({
  //                 draggable: true,
  //                 animation: google.maps.Animation.DROP,
  //                 position: new google.maps.LatLng(document.latitude, document.longitude),
  //                 map: map.instance,
  //                 id: document._id
  //             });
  //
  //             google.maps.event.addListener(marker, 'dragend', function(event) {
  //                 Meteor.call('updateMarker', marker.id, event.latLng.lat(), event.latLng.lng());
  //             });
  //
  //             markers[document._id] = marker;
  //         },
  //         changed: function (newDocument, oldDocument) {
  //             markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
  //         },
  //         removed: function (oldDocument) {
  //             markers[oldDocument._id].setMap(null);
  //             google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
  //             delete markers[oldDocument._id];
  //         }
  //     });
  // });
});

Meteor.startup(function() {
  GoogleMaps.load();
});

Template.map.helpers({
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(51.5074, -0.1278),
        zoom: 9
      };
    }
  }
});
