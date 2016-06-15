import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Requests } from './collections/requests.js';
import { Offers } from './collections/offers.js';
import { Transactions } from './collections/transactions.js';
import { Items } from './collections/items.js';
import './methods.js';

if (Meteor.isServer) {
  describe('API methods', () => {
    const consumerId = Random.id();
    const driverId = Random.id();
    var requestId;
    var imageIds = new Array();
    for (i = 0; i < 5; i++) {
      imageIds.push(Random.id());
    }
    const itemId = Random.id();
    const description = "Test Description";
    const bidWindow = 7;
    const sizeRequired = 7;
    const loc = {type: "Point", coordinates:[7,10]};
    beforeEach(() => {
      Transactions.remove({});
      Requests.remove({});
      Offers.remove({});
    });

    describe('makeRequest', () => {
      beforeEach(() => {
        const makeRequest = Meteor.server.method_handlers['makeRequest'];
        const invocation = { userId: consumerId };

        makeRequest.apply(invocation, [consumerId, imageIds, description, bidWindow, sizeRequired, loc.coordinates[0], loc.coordinates[1]]);
      });

      it('should create request', () => {
        assert.equal(Requests.find().count(), 1);
      });
    });
    describe('deleteRequest', () => {
      beforeEach(() => {
        const deleteRequest = Meteor.server.method_handlers['deleteRequest'];
        const invocation = { userId: consumerId };

        requestId = Requests.insert({
          consumerId,
          bidWindow,
          createdAt: new Date(),
          itemId,
          loc,
          isActive: true,
          isLive: true,
          borough: "Ealing"
        });
        deleteRequest.apply(invocation, [requestId]);
      });

      it('should delete request', () => {
        assert.equal(Requests.findOne(requestId).isActive, false);
      });
    });
    describe('makeOffer', () => {
      beforeEach(() => {
        const makeOffer = Meteor.server.method_handlers['makeOffer'];
        const invocation = { userId: driverId };

        const requestId = Requests.insert({
          consumerId,
          bidWindow,
          createdAt: new Date(),
          itemId,
          loc,
          isActive: true,
          isLive: true,
          borough: "Ealing"
        });
        const price = 1000;
        makeOffer.apply(invocation, [requestId, driverId, price, ]);
      });

      it('should create offer', () => {
        assert.equal(Offers.find().count(), 1);
      });
      it('should have offer with field pointing to request', () => {
        const offer = Offers.findOne();
        const request = Requests.findOne();

        assert.equal(offer.requestId, request._id);
      });

    });
    describe('acceptOffer', () => {
      beforeEach(() => {
        const acceptOffer = Meteor.server.method_handlers['acceptOffer'];
        const invocation = { userId: consumerId };

        const sizeAllocated = 7;
        const price = 1000;
        const date = new Date();
        const offerId = Random.id();
        requestId = Requests.insert({
          consumerId,
          bidWindow,
          createdAt: new Date(),
          loc,
          itemId,
          isActive: true,
          isLive: true,
          borough: "Ealing"
        });
        Offers.insert({
          _id: offerId,
          requestId,
          driverId,
          price,
          createdAt: date
        });
        acceptOffer.apply(invocation, [requestId, offerId]);
      });

      it('should delete request', () => {
         assert.equal(Requests.findOne(requestId).isActive, false);
      });
      it('should create transaction', () => {
        assert.equal(Transactions.find().count(), 1);
      });
      it('should have transaction pointing to corresponding driver', () => {
        const transaction = Transactions.findOne();

        assert.equal(transaction.driverId, driverId);
      });
    });
  });
}
