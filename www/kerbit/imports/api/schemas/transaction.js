import { Mongo } from 'meteor/mongo';

export const Transactions = new Mongo.Collection('transactions');

TransactionSchema = new SimpleSchema({

});

// TODO
// Transactions.attachSchema(TransactionSchema);

if (Meteor.isServer) {
    Meteor.publish('transactions', function transactionsPublication() {
        return Transactions.find({});
    });
}