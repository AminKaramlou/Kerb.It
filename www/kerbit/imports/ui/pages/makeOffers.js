import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Images } from '../../api/collections/images.js';


import { Requests } from '../../api/collections/requests.js';
import '../../api/methods.js';
import "./makeOffers.html";

Template.MakeOffersHelper.onCreated(function driverHomeOnCreated() {
  Meteor.subscribe('requests');
  Meteor.subscribe('images');
  
});

Template.MakeOffersHelper.helpers({

  images(imageId) {
    return Images.find({
      _id: imageId
    });
  },
  
  requests() {
    return Requests.find({});
  },
  formatDate(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November",
      "December"];
    return date.getDate() + " " + monthNames[date.getMonth()] + ", " +
      date.getFullYear() + " at " + date.getHours()  + ":" +
      date.getMinutes() ;
  },
  formatPostcode(postcode) {
    const format = postcode.substring(0,2) + " " + postcode.substring(2);
    return format.toUpperCase();
  },
  formatDescription(desc) {
    let ret = desc
    if( desc.length > 100) {
      ret = desc.substring(0,100) + " ...";
    }
    return ret;
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
        console.log(i);
        if (target.requestId[i].checked) {
          requestId = target.requestId[i].value;
        }
      }
    } else {
      requestId = target.requestId.value;
    }

    Meteor.call('makeOffer', requestId, Meteor.userId(), price);
    target.reset();
  }
});
