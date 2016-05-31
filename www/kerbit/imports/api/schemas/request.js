import { Mongo } from 'meteor/mongo';

export const Requests = new Mongo.Collection('requests');

RequestSchema = new SimpleSchema({

});

// TODO
// Requests.attachSchema(RequestSchema);

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