import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Requests } from '../../api/collections/requests.js';
import { Offers } from '../../api/collections/offers.js';
import { Transactions } from '../../api/collections/transactions.js';
import { Images } from '../../api/collections/images.js'
import { Items } from '../../api/collections/items.js'
import './myOffers.html';

Template.MyOffersHelper.onCreated(function myOffersCreated() {
  Meteor.subscribe('requests'); 
  Meteor.subscribe('offers');
  Meteor.subscribe('transactions');
  Meteor.subscribe('images');
  Meteor.subscribe('items');

  GoogleMaps.ready('map', function(map) {

    var directionsServices = {};
    var directionsDisplays = {};
    Requests.find({ isLive: false}).observe({
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

Template.MyOffersHelper.onRendered(function myRequestsCreated() {
  $(document).ready(function() {
    $('ul.tabs').tabs();
  });


});

Template.MyOffersHelper.helpers({
  ImageWithIds(imageIds) {
    return Images.find({_id: {$in: imageIds}});
  },
  ItemWithId(itemId) {
    return Items.find(itemId);
  },
  pendingOffers() {
    return Offers.find({
      driverId: Meteor.userId(),
    });
  },
  offerWithOfferId(offerId) {
    return Offers.find(offerId);
  },
  requests(requestId) {
    return Requests.find({_id: requestId, isLive: true});
  },
  transactions() {
    return Transactions.find({
      driverId: Meteor.userId()
    });
  },

});

Template.MyOffersHelper.events({
  'submit form'(event) {
    event.preventDefault();
    const target = event.target;

    const offerId = target.id.value;
    const price = Number(target.price.value);

    Meteor.call('updateOffer', offerId, price);
    target.reset();
  }
});
