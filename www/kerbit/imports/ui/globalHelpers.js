import { Template } from 'meteor/templating';
import { Requests } from '../api/collections/requests.js';
import { Offers } from '../api/collections/offers.js';
import { Images } from '../api/collections/images.js';
import { Items } from '../api/collections/items.js';

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

//Collection Helpers
Template.registerHelper('currentUsersRequests', () => {
  return Requests.find({
    consumerId: Meteor.userId()
  });
});

Template.registerHelper('offersWithRequestId', (requestId) => {
  return Offers.find({
    requestId
  });
});

Template.registerHelper('ImageWithId', (imageId) => {
  return Images.find(imageId);
});

Template.registerHelper('ItemWithId', (itemId) => {
  return Items.find(itemId);
});