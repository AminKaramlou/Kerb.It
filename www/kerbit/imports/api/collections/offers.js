import { Mongo } from 'meteor/mongo';

export const Offers = new Mongo.Collection('offers');

OffersSchema = new SimpleSchema({
  requestId: {
    type: String,
    label: "Request ID",
    regEx: SimpleSchema.RegEx.Id
  },
  driverId: {
    type: String,
    label: "Driver ID",
    regEx: SimpleSchema.RegEx.Id
  },
  price: {
    type: Number,
    label: "Price",
    defaultValue: 0
  },
  createdAt: {
    type: Date,
    label: "Created at"
  }
});

Offers.attachSchema(OffersSchema);

if (Meteor.isServer) {
  Meteor.publish('offers', function offersPublication() {
    return Offers.find({
        driverId: this.userId
    });
  });

  Meteor.publish('offersByRequest', function offersPublication(requestId) {
    return Offers.find({
        requestId: requestId
    });
  });
}