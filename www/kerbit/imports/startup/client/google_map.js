import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import '../../api/methods.js';

Meteor.startup(function() {
  GoogleMaps.load();
  
});