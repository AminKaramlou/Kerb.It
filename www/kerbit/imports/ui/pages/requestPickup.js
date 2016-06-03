import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../api/collections/images.js';

import '../../api/methods.js';
import "./requestPickup.html";

Template.RequestPickupHelper.onCreated(function(){
  var self = this;
  GoogleMaps.ready('map', function(map) {
    var marker = new google.maps.Marker({
      draggable: true,
      animation: google.maps.Animation.DROP,
      position: map.center,
      map: map.instance,
      id: document._id
    });

    self.marker = new ReactiveVar(marker);


    google.maps.event.addListener(map.instance, 'click', function (event) {
      marker.setPosition(event.latLng);
      self.marker.set(marker);
    });
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
    const postcode = target.postcode.value;
    
    const image = target.file.files[0];
    const imageId = Images.insert(image)._id;
    
    function getCurrentCenter() {
      var currentCenter = new google.maps.LatLng(Template.map.getCenter());
    }

    const position = template.marker.get().position;
    

    Meteor.call('makeRequest', Meteor.userId(), imageId, description, bidWindow,
      sizeRequired, postcode, position.lat(), position.lng());
    target.reset();
  }
});
