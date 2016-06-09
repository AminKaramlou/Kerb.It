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
    label: "Bid window",
    min: 1,
    max: 20160 // Unit is minutes, maybe move to hours ?
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
  }
});

Requests.attachSchema(RequestsSchema);

if (Meteor.isServer) {
  Meteor.publish('requests', function requestsPublication() {
    if (Meteor.users.findOne(this.userId).profile.isDriver) {

      return Requests.find({});
    }
    
    return Requests.find({

      consumerId: this.userId
    });
  });
}
