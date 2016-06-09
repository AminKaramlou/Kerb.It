import { Mongo } from 'meteor/mongo';

export const Transactions = new Mongo.Collection('transactions');

TransactionsSchema = new SimpleSchema({
  consumerId: {
    type: String,
    label: "Transaction ID",
    regEx: SimpleSchema.RegEx.Id
  },
  imageIds: {
    type: [String],
    label: "Image IDs",
    regEx: SimpleSchema.RegEx.Id
  },
  description: {
    type: String,
    label: "Description",
    max: 200
  },
  sizeAllocated: {
    type: Number,
    label: "Allocated size",
    min: 1,
    max: 10
  },
  createdAt: {
    type: Date,
    label: "Created at"
  },
  price: {
    type: Number,
    label: "Price",
    optional: true
  },
  driverId: {
    type: String,
    label: "Driver ID",
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  dateConfirmed: {
    type: Date,
    label: "Date Confirmed",
    optional: true
  },
  isCollected: {
    type: Boolean,
    label: "Job was collected",
    optional: true
  },
  dateCollected: {
    type: Date,
    label: "Date collected",
    optional: true
  },
  hasLeftFeedback: {
    type: Boolean,
    label: "Feedback left",
    optional: true
  },
  dateRated: {
    type: Date,
    label: "Feedback left on this date",
    optional: true
  },
  feedbackScore: {
    type: Number,
    label: "Given feedback score",
    min: 0,
    max: 5
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
});

Transactions.attachSchema(TransactionsSchema);

if (Meteor.isServer) {
  Meteor.publish('transactions', function transactionsPublication() {
    return Transactions.find({}, {
      $or: [
        { consumerId: this.userId },
        { driverId: this.userId }
      ]
    });
  });
  Meteor.publish('users', function usersPublication() {
    let transactions = Transactions.find({consumerId: this.userId}, {
      fields: { driverId: 1, _id: 0 }
    }).fetch();
    var driverIds = [];
    for (var i in transactions) {
      driverIds.push(transactions[i].driverId);
    }
    return Meteor.users.find({
      _id: { $in: driverIds }
    }, {
      fields: { profile: 1 }
    });
  });
  Meteor.publish('getUserDetails', function(username) {
    return Meteor.users.findOne({'username': username});
  });
}
