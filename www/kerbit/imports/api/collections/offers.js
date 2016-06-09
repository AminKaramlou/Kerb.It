import { Mongo } from 'meteor/mongo';

export const Offers = new Mongo.Collection('offers');

OffersSchema = new SimpleSchema({
  requestId: {
    type: String,
    label: "Request ID",
    regEx: SimpleSchema.RegEx.Id
  },
  consumerId: {
    type: String,
    label: "Consumer ID",
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
  rating: {
    type: Number,
    label: "Rating",
    decimal: true
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
      $or: [
        {consumerId: this.userId},
        {driverId: this.userId}
      ]
    });
  });
}
