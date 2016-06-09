import { Mongo } from 'meteor/mongo';

export const Items = new Mongo.Collection('items');

ItemSchema = new SimpleSchema({
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
  sizeRequired: {
    type: Number,
    label: "Required size estimate",
    min: 1,
    max: 10 // Unit is cubic metres, maybe move to move to black bags ?
  },
  createdAt: {
    type: Date,
    label: "Created at"
  },
  expiryTime: {
    type: Date,
    label: "Expiry Time"
  }
});

if (Meteor.isServer) {
  Meteor.publish('items', function itemsPublication() {
    if (Meteor.users.findOne(this.userId).profile.isDriver) {
      return Items.find({});
    }
    return Items.find({
      consumerId: this.userId
    });
  });
}
