import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Images} from '../../api/collections/images.js';
import {Items} from '../../api/collections/items.js';
import {Requests} from '../../api/collections/requests.js';
import {Offers} from '../../api/collections/offers.js';

import '../../api/methods.js';
import "./makeOffers.html";


Session.setDefault("selectedArea", "");

Template.MakeOffersHelper.rendered = function () {
  $('.collapsible').collapsible({
    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });
};

Template.MakeOffersHelper.onCreated(function driverHomeOnCreated() {
  Meteor.subscribe('requests');
  Meteor.subscribe('images');
  Meteor.subscribe('items');
  Meteor.subscribe('offers');
  GoogleMaps.ready('map', function (map) {
    // Load in our geojson
    map.instance.data.loadGeoJson('/londonboroughs.geojson');

    // Color each borough blue.
    map.instance.data.setStyle(function (feature) {
      var color = 'blue';
      if (feature.getProperty('isColorful')) {
        color = 'green';
      }
      return /** @type {google.maps.Data.StyleOptions} */({
        fillColor: color,
        strokeColor: color,
        strokeWeight: 2
      });
    });
    var lastClicked;
    // When the user clicks, set 'isColorful', changing the color of the letters.
    map.instance.data.addListener('click', function (event) {
      if (lastClicked) {
        // make last clicked borough not colorful
        lastClicked.setProperty('isColorful', false);
      }
      event.feature.setProperty('isColorful', true);
      Session.set("selectedArea", event.feature.getProperty('name'));
      $('#modal1').openModal();
      lastClicked = event.feature;
    });

    // When the user hovers, tempt them to click by outlining the letters.
    // Call revertStyle() to remove all overrides. This will use the style rules
    // defined in the function passed to setStyle()
    map.instance.data.addListener('mouseover', function (event) {
      map.instance.data.revertStyle();
      map.instance.data.overrideStyle(event.feature, {strokeWeight: 8});
    });

    map.instance.data.addListener('mouseout', function (event) {
      map.instance.data.revertStyle();
    });
  });


});

// GoogleMaps.ready('map', function(map) {
//   var directionsServices = {};
//   var directionsDisplays = {};
//
//   Requests.find({isActive: true}).observe({
//     added: function (document) {
//
//       directionsServices[document._id] = new google.maps.DirectionsService;
//       directionsDisplays[document._id] = new google.maps.DirectionsRenderer;
//       directionsDisplays[document._id].setMap(map.instance);
//
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function (position) {
//           currentPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//           directionsServices[document._id].route({
//             origin: currentPos,
//             destination: new google.maps.LatLng(document.loc.coordinates[1], document.loc.coordinates[0]),
//             travelMode: google.maps.TravelMode.DRIVING,
//           }, function (response, status) {
//             if (status === google.maps.DirectionsStatus.OK) {
//               directionsDisplays[document._id].setDirections(response);
//             } else {
//               window.alert('Directions request failed due to ' + status);
//             }
//           });
//         })
//       }
//     },
//
//     removed: function (oldDocument) {
//       directionsDisplays[oldDocument._id].setMap(null);
//       delete directionsDisplays[oldDocument._id];
//       delete directionsServices[oldDocument._id];
//     }
//   });
// });

Template.MakeOffersHelper.helpers({

  getArea()   {
    return Session.get("selectedArea");
  },

  images(imageIds) {
    return Images.find({_id: {$in: imageIds}});
  },

  items(itemId) {
    return Items.findOne(itemId);
  },

  getNum(borough) {
    Meteor.subscribe('requestsByArea', borough);
    return Requests.find({
      isLive: true,
      borough: borough
    }).count();
  },

  requests(borough) {
    Meteor.subscribe('requestsByArea', borough);
    return Requests.find({
      isLive: true,
      borough: borough
    });
  },

  hasAlreadyMadeOffer(requestId)  {
    return (Offers.findOne({
      driverId: Meteor.userId(),
      requestId: requestId
    }));
  },

  getOfferId(requestId)  {
    return (Offers.findOne({
      driverId: Meteor.userId(),
      requestId: requestId
    }))._id;
  },

  getOfferPrice(requestId)  {
    return (Offers.findOne({
      driverId: Meteor.userId(),
      requestId: requestId
    })).price;
  },

  mapOptions: function () {
    if (GoogleMaps.loaded()) {

      return {
        center: new google.maps.LatLng(51.5074, -0.1278),
        zoom: 10,
        minZoom: 10
      };
    }
  }
});

Template.MakeOffersHelper.events({
  'submit .input'(event) {
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
    Materialize.toast("Your offer was recorded. Please check the My Offers page for updates", 4000);
  },

  'submit .update'(event) {
    event.preventDefault();
    const target = event.target;

    const offerId = target.id.value;
    const price = Number(target.price.value);

    Meteor.call('updateOffer', offerId, price);
    target.reset();
  }
});
