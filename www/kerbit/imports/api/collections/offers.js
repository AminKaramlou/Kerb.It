import { Mongo } from 'meteor/mongo';

export const Offers = new Mongo.Collection('offers');

OfferSchema = new SimpleSchema({

});

// TODO
// Offers.attachSchema(OfferSchema);

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