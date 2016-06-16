import { Template } from 'meteor/templating';
import { Offers } from '../api/collections/offers.js';
import { Requests } from '../api/collections/requests.js';

Template.registerHelper('formatDate', (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", 
                        "December"];
    return date.getDate() + " " + monthNames[date.getMonth()] + ", " + 
           date.getFullYear() + " at " + date.getHours()  + ":" +
           date.getMinutes() ;
});
Template.registerHelper('formatPostcode', (postcode) => {
    let cut = 3;
    if (!isNaN(parseInt(postcode[1]))) {
      cut = 2;
    }
    const format = postcode.substring(0,cut) + " " + postcode.substring(cut);
    return format.toUpperCase();
});

Template.registerHelper('formatDescription', (desc) => {
  let ret = desc;
  if( desc.length > 100) {
    ret = desc.substring(0,100) + " ...";
  }
  return ret;
});

Template.registerHelper('formatLocation', (requestId) => {
  Meteor.subscribe('requests');
  let request = Requests.findOne(requestId);
  return request.borough;
});

Template.registerHelper('formatPrice', (finalOffer, requestId) => {
  Meteor.subscribe('requests')
  Meteor.subscribe('offersByRequest', requestId);
  let offer = Offers.findOne(finalOffer);
  return offer.price;
});

Template.registerHelper('getUsernameFromID', (userId) => {
  Meteor.subscribe('users');
  let user = Meteor.users.findOne(userId);
  return user.username;
});