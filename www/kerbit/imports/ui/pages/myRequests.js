import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Requests } from '../../api/collections/requests.js';
import { Offers } from '../../api/collections/offers.js';
import { Images } from '../../api/collections/images.js';
import './myRequests.html';

Template.MyRequests.onCreated(function myRequestsCreated() {
  Meteor.subscribe('requests');
  Meteor.subscribe('offers');
  Meteor.subscribe('images');
});

Template.MyRequests.helpers({

  images(imageId) {
    console.log("hello baby");
    return Images.find({
      imageId
    });
  },

  requests() {
    return Requests.find({
      consumerId: Meteor.userId()
    });
  },
  offers(requestId) {
    return Offers.find({
      requestId
    });
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

Template.MyRequests.events({
  'click .accept-offer'() {
    Meteor.call('acceptOffer', this.transactionId, this.requestId, this._id, this.driverId, 100, this.price);
  },
  'click .delete-request'() {
    Meteor.call('deleteRequest', this._id);
  },
});
