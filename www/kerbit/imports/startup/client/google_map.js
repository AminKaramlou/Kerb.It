import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../../api/methods.js';

Meteor.startup(function() {
  GoogleMaps.load( { key: 'AIzaSyBnvwhKrpFJ_r1_7zl0p4NZ07tmNvXm9MU', libraries: 'geometry'});
});