import { Mongo } from 'meteor/mongo';

export const Requests = new Mongo.Collection('requests');

RequestsSchema = new SimpleSchema({
  consumerId: {
    type: String,
    label: "Consumer ID",
    regEx: SimpleSchema.RegEx.Id,
  },
  imageId: {
    type: String,
    label: "Image ID",
    regEx: SimpleSchema.RegEx.Id,
  },
  description: {
    type: String,
    label: "Description",
    max: 200
  },
  bidWindow: {
    type: Number,
    label: "Bid window",
    min: 1,
    max: 20160 // Unit is minutes, maybe move to hours ?
  },
  sizeRequired: {
    type: Number,
    label: "Required size estimate",
    min: 1,
    max: 10 // Unit is cubic metres, maybe move to move to black bags ?
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
  offers: {
    type: [String],
    label: "Offers",
    defaultValue: []
  },
  createdAt: {
    type: Date,
    label: "Created at"
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
