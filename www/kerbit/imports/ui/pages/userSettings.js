import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {UserImages} from '../../api/collections/userImages.js';

import "./userSettings.html";


Template.changeUserSettings.events({
  'change #file' (event) {

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#image').attr('src', e.target.result);
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  },

  'submit form'(event, template) {
    event.preventDefault();
    const target = event.target;
    const images = target.file.files;
    console.log("imageInsert");
    var imageId = UserImages.insert(images[0])._id;
    Meteor.call('uploadUserImage',imageId, Meteor.userId());
    console.log(imageId);
    target.reset();
  }
});