import { Mongo } from 'meteor/mongo';

export const Requests = new Mongo.Collection('requests');

RequestSchema = new SimpleSchema({
  consumerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function() {
      return this.userId;
    }
  },
  description: {
    type: String,
    label: "Description",
    max: 200
  },
  bidWindow: {
    type: Number,
    label: "Bid window",
    min: 0,
    max: 20160 // Unit is minutes, maybe move to hours ?
  },
  sizeRequired: {
    type: Number,
    label: "Required size estimate",
    min: 1,
    max: 10 // Unit is cubic metres, maybe move to move to black bags ?
  },
  postcode: {
    type: String,
    label: "Postcode",
    regEx: /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/ 
  },
  offers: {
    type: [String],
    label: "Offers",
    defaultValue: []
  },
  createdAt: {
    type: Date,
    label: "Created at",
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date()};
      } else {
        unset();
      }
    }
  }
});

Requests.attachSchema(RequestSchema);

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
