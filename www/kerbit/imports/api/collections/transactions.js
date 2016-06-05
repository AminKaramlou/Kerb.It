import { Mongo } from 'meteor/mongo';

export const Transactions = new Mongo.Collection('transactions');

TransactionsSchema = new SimpleSchema({
  consumerId: {
    type: String,
    label: "Transaction ID",
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
  postcode: {
    type: String,
    label: "Postcode",
    regEx: /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) ?[0-9][A-Za-z]{2})$/ 
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
    // TODO FIX FIX FIX needs to filter users database
    // let transactions = Transactions.find({consumerId: this.userId}, {
    //     driverId: 1, _id: 0
    // });
    // var driverIds = [];
    // for (var i in transactions) {
    //   driverIds.push(transactions[i].driverId);
    // }
    // console.log(driverIds);
    return Meteor.users.find({});
  });
  Meteor.publish('getUserDetails', function(username) {
    return Meteor.users.findOne({'username': username});
});
}
