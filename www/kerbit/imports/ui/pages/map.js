import "./map.html";

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
