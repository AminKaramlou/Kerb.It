import { Mongo } from 'meteor/mongo';

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
  }
});

Requests.attachSchema(RequestsSchema);

if (Meteor.isServer) {
  Meteor.publish('requests', function requestsPublication() {
    if (Meteor.users.findOne(this.userId).profile.isDriver) {
      return Requests.find({
        isLive: true
      });
    }

    return Requests.find({
      consumerId: this.userId
    });
  });
}
