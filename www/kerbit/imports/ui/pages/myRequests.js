import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Requests } from '../../api/collections/requests.js';
import { Transactions } from '../../api/collections/transactions.js';
import { Offers } from '../../api/collections/offers.js';
import { Images } from '../../api/collections/images.js';
import { Items } from '../../api/collections/items.js';
import './myRequests.html';

Template.MyRequestsHelper.onCreated(function myRequestsCreated() {
  Meteor.subscribe('requests');
  Meteor.subscribe('images');
  Meteor.subscribe(('items'))
  Meteor.subscribe('transactions');
});

Template.MyRequestsHelper.helpers({
  ImageWithIds(imageIds) {
    return Images.find({_id: {$in: imageIds}});
  },

  ItemWithId(itemId) {
    return Items.find(itemId);
  },

  currentUsersRequests() {
    return Requests.find({
      consumerId: Meteor.userId(),
      isActive: true
    });
  },
  offersWithRequestId(requestId) {
    Meteor.subscribe('offersByRequest', requestId);
    return Offers.find({
      requestId
    },{sort :{rating:-1}});
  },
  transactions() {
    return Transactions.find({
      consumerId: Meteor.userId()
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
  formatDescription(desc) {
    let ret = desc;
    if( desc.length > 100) {
      ret = desc.substring(0,100) + " ...";
    }
    return ret;
  }
});

Template.MyRequestsHelper.events({
  'click .tab-links button' () {
    const target = event.target;
    const name = target.name;
    $(name).show().siblings().hide();
    $(target).parent('li').addClass('active').siblings().removeClass('active');
  },

  'click #refresh-requests'() {
    javascript:history.go(0)
  },
  'click #accept-offer'() {
    Meteor.call('acceptOffer', this.requestId, this._id);
  },
  'click #delete-request'() {
    Meteor.call('deleteRequest', this._id);
  },
  'click #delete-all-requests'() {
    alert('Feature not implemented yet!')
    // TODO implement this button
  }
});
