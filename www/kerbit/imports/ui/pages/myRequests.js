import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Requests } from '../../api/collections/requests.js';
import { Offers } from '../../api/collections/offers.js';
import { Images } from '../../api/collections/images.js';
import { Items } from '../../api/collections/items.js';
import './myRequests.html';

Template.MyRequestsHelper.onCreated(function myRequestsCreated() {
  Meteor.subscribe('requests');
  Meteor.subscribe('images');
  Meteor.subscribe(('items'))
});

Template.MyRequestsHelper.helpers({
  ImageWithId(imageId) {
    return Images.find(imageId);
  },

  ItemWithId(itemId) {
    return Items.find(itemId);
  },

  currentUsersRequests() {
    return Requests.find({
      consumerId: Meteor.userId()
    });
  },
  offersWithRequestId(requestId) {
    Meteor.subscribe('offersByRequest', requestId);
    return Offers.find({
      requestId: requestId
    });
  }
});

Template.MyRequestsHelper.events({
  'click .refresh-requests'() {
    javascript:history.go(0)
  },
  'click #accept-offer'() {
    Meteor.call('acceptOffer', this.requestId, this._id, 5);
  },
  'click #delete-request'() {
    Meteor.call('deleteRequest', this._id);
  },
  'click #delete-all-requests'() {
    alert('Feature not implemented yet!')
    // TODO implement this button
  }
});
