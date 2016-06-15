import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Images} from '../../api/collections/images.js';
import {Session} from 'meteor/session';
import '../../api/methods.js';
import "./requestPickup.html";


Template.RequestPickupHelper.onCreated(function () {
  var self = this;



  GoogleMaps.ready('map', function (map) {
    var marker = new google.maps.Marker({
      map: map.instance,
      draggable: true,
      position: map.instance.getCenter()
    });
    Session.set('long', map.instance.getCenter().lng());
    Session.set('lat', map.instance.getCenter().lat());
    //console.log(map.instance.getCenter());

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.instance.setCenter(initialLocation);
        marker.setPosition(initialLocation);
        map.instance.setZoom(15);
      });
      Session.set('long', marker.getPosition().lng());
      Session.set('lat', marker.getPosition().lat());
    }


    google.maps.event.addListener(marker, 'dragend', function (event) {
      marker.getPosition();
      Session.set("long", marker.getPosition().lng());
      Session.set("lat", marker.getPosition().lat());

    });


    // var input = document.getElementById('search');
    // var searchBox = new google.maps.places.SearchBox(input);
    // input.hidden = false;
    // // map.instance.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // var lastLoc = document.getElementById('last-loc');
    // lastLoc.hidden = false;
    // //map.instance.controls[google.maps.ControlPosition.LEFT_TOP].push(lastLoc);
    //
    // searchBox.addListener('places_changed', function () {
    //   var places = searchBox.getPlaces();
    //   map.instance.setCenter(places[0].geometry.location);
    // });

    self.map = new ReactiveVar(map);
  });
});

Template.RequestPickupHelper.onRendered(function () {
  $('.modal-trigger').leanModal();
  $('ul.tabs').tabs();
  document.getElementById('edit-pickup').style.display='none';
});

Template.RequestPickupHelper.helpers(
    {
      mapOptions: function () {
        if (GoogleMaps.loaded()) {

          return {
            center: new google.maps.LatLng(51.5074, -0.1278),
            zoom: 10,
            minZoom: 10,
            clickableIcons: false
          };
        }
      }
    });

Template.RequestPickupHelper.events({
  'click #last-loc' (event, template) {
    if (Meteor.user().lastLoc) {
      const lastLoc = new google.maps.LatLng(Meteor.user().lastLoc.coordinates[1],
          Meteor.user().lastLoc.coordinates[0]);
      template.map.get().instance.setCenter(lastLoc);
    }
  },

  'change #file' (event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#image').attr('src', e.target.result);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  },

  'submit .details'(event, template) {
    event.preventDefault();
    const target = event.target;

    const description = target.description.value;
    const bidWindow = target.bidWindow.value;
    var sizeRequired;
    if (target.sizeCubic.value> 0)  {
      sizeRequired = Number(target.sizeCubic.value);
    } else {
      binBags = Number(target.sizeRequired.value);
      sizeRequired = binBags /10;
    }


    const images = target.clientImage.files;
    let imageIds = new Array();
    for (i = 0; i < images.length; i++) {
      imageIds.push(Images.insert(images[i])._id);
    }

    var latitude = Session.get('lat');
    var longtitude = Session.get('long');
    Meteor.call('makeRequest', Meteor.userId(), imageIds, description, bidWindow,
        sizeRequired, longtitude, latitude);
    target.reset();
    $('#modal1').closeModal();
    FlowRouter.go('My Requests');
  }
});
