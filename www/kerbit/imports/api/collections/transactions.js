import { Mongo } from 'meteor/mongo';

export const Transactions = new Mongo.Collection('transactions');

TransactionsSchema = new SimpleSchema({
  consumerId: {
    type: String,
    label: "Transaction ID",
    regEx: SimpleSchema.RegEx.Id
  },
  driverId: {
    type: String,
    label: "Driver ID",
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  item:{
    type: String,
    label: "Item ID"
  },
  finalOffer:{
    type: String,
    label: "Offer ID"
  },
  dateConfirmed: {
    type: Date,
    label: "Date Confirmed",
    optional: true
  },
  isCompleted: {
    type: Boolean,
    label: "Job was completed",
    optional: true
  },
  dateCompleted: {
    type: Date,
    label: "Date Completed",
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
  }
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
