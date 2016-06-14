import { Mongo } from 'meteor/mongo';
import { Transactions } from './transactions.js';
import { Offers } from './offers.js';


export const Requests = new Mongo.Collection('requests');

RequestsSchema = new SimpleSchema({
  consumerId: {
    type: String,
    label: "Consumer ID",
    regEx: SimpleSchema.RegEx.Id,
  },
  bidWindow: {
    type: Number,
    label: "Bid Window",
    min: 1,
    max: 20160 //Unit: minutes
  },
  createdAt: {
    type: Date,
    label: "Created at"
  },
  loc: {
    type: Object,
    index: '2dsphere',
    label: "Location"
  },
  "loc.type": {
    type: String,
    allowedValues: ["Point"],
    label: "Start location type"
  },
  "loc.coordinates": {
    type: [Number],
    minCount: 2,
    maxCount: 2,
    decimal: true
  },
  itemId: {
    type: String,
    label: "Item ID"
  },
  isActive: {
    type: Boolean,
    label: "Is Active"
  },
  isLive: {
    type: Boolean,
    label: "Is Live"
  },
  borough: {
    type: String,
    label: "Borough where item is located"
  }
});

Requests.attachSchema(RequestsSchema);

if (Meteor.isServer) {

  Meteor.publish('requestsByArea', function offersPublication(area) {
    return Requests.find({
      borough: area
    });
  });

  Meteor.publish('requests', function requestsPublication() {
    if (Meteor.users.findOne(this.userId).profile.isDriver) {
      const transactions = Transactions.find({driverId: this.userId}, {fields: { finalOffer: 1 }}).fetch();
      var offerIds = [];
      for (var i in transactions) {
        offerIds.push(transactions[i].finalOffer);
      }
      const offers = Offers.find({_id: { $in: offerIds }}, {fields: { requestId: 1 }}).fetch();
      var requestIds = [];
      for (var i in offers) {
        requestIds.push(offers[i].requestId);
      }
      return Requests.find({
        $or: [
          {isActive: true, isLive: true},
          {_id: { $in: requestIds } }
        ]
      });
    }

    return Requests.find({
      consumerId: this.userId
    });
  });
}
