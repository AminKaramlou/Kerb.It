import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../api/collections/images.js';
import { Requests } from '../../api/collections/requests.js';

import '../../api/methods.js';
import "./makeOffers.html";

Template.MakeOffersHelper.onCreated(function driverHomeOnCreated() {
  Meteor.subscribe('requests');
  Meteor.subscribe('images');

  GoogleMaps.ready('map', function(map) {

    var directionsServices = {};
    var directionsDisplays = {};




    Requests.find().observe({
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
  
  requests() {
    if (Geolocation.currentLocation()) {
      return Requests.find(
      {
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
  },
  formatDate(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November",
      "December"];
    return date.getDate() + " " + monthNames[date.getMonth()] + ", " +
      date.getFullYear() + " at " + date.getHours()  + ":" +
      date.getMinutes() ;
  },

  formatDescription(desc) {
    let ret = desc
    if( desc.length > 100) {
      ret = desc.substring(0,100) + " ...";
    }
    return ret;
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

    Meteor.call('makeOffer', requestId, Meteor.userId(), price);
    target.reset();
  }
});
