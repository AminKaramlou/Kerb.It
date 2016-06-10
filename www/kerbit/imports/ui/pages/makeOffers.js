import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../api/collections/images.js';
import { Items } from '../../api/collections/items.js';
import { Requests } from '../../api/collections/requests.js';

import '../../api/methods.js';
import "./makeOffers.html";

Template.MakeOffersHelper.onCreated(function driverHomeOnCreated() {
  Meteor.subscribe('requests');
  Meteor.subscribe('images');
  Meteor.subscribe('items');

  GoogleMaps.ready('map', function(map) {

    var directionsServices = {};
    var directionsDisplays = {};




    Requests.find({isActive: true}).observe({
      added: function (document) {

        directionsServices[document._id] = new google.maps.DirectionsService;
        directionsDisplays[document._id] = new google.maps.DirectionsRenderer;
        directionsDisplays[document._id].setMap(map.instance);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            currentPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            directionsServices[document._id].route({
              origin: currentPos,
              destination: new google.maps.LatLng(document.loc.coordinates[1], document.loc.coordinates[0]),
              travelMode: google.maps.TravelMode.DRIVING,
            }, function (response, status) {
              if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplays[document._id].setDirections(response);
              } else {
                window.alert('Directions request failed due to ' + status);
              }
            });
          })
        }
      },

      removed: function (oldDocument) {
        directionsDisplays[oldDocument._id].setMap(null);
        delete directionsDisplays[oldDocument._id];
        delete directionsServices[oldDocument._id];
      }
    });
  });
});

Template.MakeOffersHelper.helpers({

  images(imageIds) {
    return Images.find({_id: {$in: imageIds}});
  },

  items(itemId) {
    return Items.findOne(itemId);
  },
  
  requests() {
    if (Geolocation.currentLocation()) {
       return Requests.find(
      {
        isActive: true,
        loc: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [Geolocation.currentLocation().coords.longitude,
                Geolocation.currentLocation().coords.latitude]
            },
          }
        }
      });
    }
  }
});

Template.MakeOffersHelper.events({
  'submit form'(event) {
    event.preventDefault();

    const target = event.target;
    const price = Number(target.price.value);
    var requestId;
    if (target.requestId.length) {
      for (var i in target.requestId) {
        if (target.requestId[i].checked) {
          requestId = target.requestId[i].value;
        }
      }
    } else {
      requestId = target.requestId.value;
    }
    Meteor.call('makeOffer', requestId, Meteor.userId(), price, Meteor.user().rating);
    target.reset();
    alert("Your offer was recorded. Please check the My Offers page for updates");
  }
});
