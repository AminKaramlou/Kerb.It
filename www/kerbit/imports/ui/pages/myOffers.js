import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Requests } from '../../api/collections/requests.js';
import { Offers } from '../../api/collections/offers.js';
import { Transactions } from '../../api/collections/transactions.js';
import { Images } from '../../api/collections/images.js'
import './myOffers.html';

Template.MyOffersHelper.onCreated(function myOffersCreated() {
  Meteor.subscribe('requests'); 
  Meteor.subscribe('offers');
  Meteor.subscribe('transactions');
  Meteor.subscribe('images');

  GoogleMaps.ready('map', function(map) {

    var directionsServices = {};
    var directionsDisplays = {};




    Transactions.find({driverId: Meteor.userId()}).observe({
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

Template.MyOffersHelper.helpers({
  images(imageIds) {
    return Images.find({_id: {$in: imageIds}});
  },

  offers() {
    return Offers.find({
      driverId: Meteor.userId()
    });
  },
  requests(requestId) {
    return Requests.find(requestId);
  },
  transactions() {
    return Transactions.find({
      driverId: Meteor.userId()
    });
  },

});

Template.MyOffersHelper.events({
  'click .tab-links button' () {
    const target = event.target;
    const name = target.name;
    $(name).show().siblings().hide();
    $(target).parent('li').addClass('active').siblings().removeClass('active');
  },
});