import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../api/collections/images.js';
import { Items } from '../../api/collections/items.js';
import { Requests } from '../../api/collections/requests.js';

import '../../api/methods.js';
import "./makeOffers.html";

var src = 'https://www.kerbit.co.uk/london.kml';

function loadKmlLayer(src, map) {
  var kmlLayer = new google.maps.KmlLayer(src, {
    suppressInfoWindows: true,
    preserveViewport: false,
    map: map
  });
  kmlLayer.setMap(map);
  google.maps.event.addListener(kmlLayer, 'click', function(event) {
    var content = event.featureData.name;
    kmlLayer.setOptions({fillOpacity:1});
    alert(content);

  });
  google.maps.event.addListener(kmlLayer, 'mouseover', function(event) {
    this.setOptions({fillColor: "#00FF00"});
    tooltip.style.visibility = 'visible';
});

google.maps.event.addListener(kmlLayer, 'mouseout', function() {
    kmlLayer.setOptions({fillOpacity:0.0});
});
}

Template.MakeOffersHelper.onCreated(function driverHomeOnCreated() {
  Meteor.subscribe('requests');
  Meteor.subscribe('images');
  Meteor.subscribe('items');
  GoogleMaps.ready('map', function(map) {
    console.log("gets here");
    //loadKmlLayer(src, map.instance);
    console.log("function runs");
    console.log("gets here2");
    map.instance.data.loadGeoJson('http://cors.io/?u=https://www.kerbit.co.uk/londonboroughs.geojson');
    console.log("function runs2");
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
  },

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
    Materialize.toast("Your offer was recorded. Please check the My Offers page for updates", 4000);
  }
});
