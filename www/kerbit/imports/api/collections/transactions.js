import { Mongo } from 'meteor/mongo';

export const Transactions = new Mongo.Collection('transactions');

TransactionsSchema = new SimpleSchema({
  consumerId: {
    type: String,
    label: "Consumer ID",
    regEx: SimpleSchema.RegEx.Id
  },
  driverId: {
    type: String,
    label: "Driver ID",
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  itemId: {
    type: String,
    label: "Item ID",
    regEx: SimpleSchema.RegEx.Id
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
    let transactions = Transactions.find({
      $or: [
        {consumerId: this.userId},
        {driverId: this.userId}
      ],
    }, {
      fields: { consumerId: 1, driverId: 1, _id: 0 }
    }).fetch();
    var userIds = [];
    for (var i in transactions) {
      userIds.push(transactions[i].driverId);
      userIds.push(transactions[i].consumerId);
    }
    return Meteor.users.find({
      _id: { $in: userIds }
    }, {
      fields: { profile: 1 ,
      username: 1,
      imageId: 1}
    });
  });
  Meteor.publish('getUserDetails', function(username) {
    return Meteor.users.findOne({'username': username});
  });
}
