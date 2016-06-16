import { Meteor }   from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import {UserImages} from '../../api/collections/userImages.js';

import "./customSettings.html";

var validateEmail = (email) => {
  var re = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/;
  return re.test(email);
};

var validateUsername = (username) => {
  var re = /^(?=.*[a-zA-Z]+)(?=.*[\d]*)[a-zA-Z0-9]{1,15}$/;
  return re.test(username);
};

Template.CustomSettings.events({
  'submit .email'(event) {
    event.preventDefault();
    const newEmail = event.target.email.value;
    if (!newEmail || !validateEmail(newEmail)) {
      Materialize.toast("The email you entered is not valid.", 4000);
      event.target.reset();
      return;
    }
    Meteor.call('changeEmail', newEmail);
    event.target.reset();
    Materialize.toast("Your email address has been changed.", 4000);
  }, 
  'submit .username'(event) {
    event.preventDefault();
    const newUsername = event.target.username.value;
    if(!newUsername || !validateUsername(newUsername)) {
      event.target.reset();
      Materialize.toast("The username you entered is not valid.", 4000);
      return;
    }
    Meteor.call('changeUsername', newUsername, function(error, result) {
    if(result) {
      Materialize.toast("Your username has been changed.", 4000);
    } else {
      Materialize.toast("The username you entered already exists", 4000);
    }
    event.target.reset();
    }); 
  },
  'submit .password'(event) {
    event.preventDefault();
    const oldPassword     = event.target.password.value;
    const newPassword     = event.target.newPassword.value;
    const confirmPassword = event.target.confirmPassword.value;
    if (newPassword.length < 6) {
      event.target.reset();
      Materialize.toast('The password you entered was less than 6 characters long'
                        , 4000);
      return;
    } else if(newPassword !== confirmPassword) {
      Materialize.toast('You did not confirm your password correctly.', 4000);
      return;
    }
    Accounts.changePassword(oldPassword, newPassword, function(error) {; 
      let message = '';
      if(error) {
        message = error.reason;
      } else {
        console.log('Boi');
        message = 'Your password has been reset';
      }
      Materialize.toast(message, 4000);
      event.target.reset();
    });
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

  'submit .userId'(event, template) {
    event.preventDefault();
    const target = event.target;
    const images = target.picture.files;
    console.log("imageInsert");
    var imageId = UserImages.insert(images[0])._id;
    Meteor.call('uploadUserImage',imageId, Meteor.userId());
    console.log(imageId);
    target.reset();
  }
});
