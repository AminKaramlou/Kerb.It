import { Mongo } from 'meteor/mongo';

export const Offers = new Mongo.Collection('offers');

OffersSchema = new SimpleSchema({
  requestId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  consumerId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  driverId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    autoValue: function() {
      return this.userId;
    }
  },
  price: {
    type: Number,
    label: "Price",
    defaultValue: 0
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
