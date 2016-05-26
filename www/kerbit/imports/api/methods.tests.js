import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
 
import { Transactions, Requests, Offers } from './collections.js';
import './methods.js';
 
if (Meteor.isServer) {
  describe('API methods', () => {
    const consumerId = Random.id();
    const driverId = Random.id();

    beforeEach(() => {
      Transactions.remove({});
      Requests.remove({});
      Offers.remove({});
    });

    describe('makeRequest', () => {
      beforeEach(() => {
        const makeRequest = Meteor.server.method_handlers['makeRequest'];
        const invocation = { consumerId };

        makeRequest.apply(invocation, {consumerId}); 
      });

      it('should create request', () => {
        assert.equal(Requests.find().count(), 1);
      });
      it('should create transaction', () => {
        assert.equal(Transactions.find().count(), 1);
      });
      it('should have request with field pointing to transaction', () => {
        const transaction = Transactions.findOne();
        const request = Requests.findOne();
        assert.equal(request.transactionId, transaction._id);
      });
    });
    describe('makeOffer', () => {
      beforeEach(() => {
        const makeOffer = Meteor.server.method_handlers['makeOffer'];
        const invocation = { driverId };
    
        const requestId = Requests.insert({
          offers: []
        });

        makeOffer.apply(invocation, [requestId, driverId]); 
      });

      it('should create offer', () => {
        assert.equal(Offers.find().count(), 1);
      });
      it('should have offer with field pointing to request', () => {
        const offer = Offers.findOne();
        const request = Requests.findOne();

        assert.equal(offer.requestId, request._id);
      });
      it('should have request with array with element pointing to offer', () => {
        const offer = Offers.findOne();
        const request = Requests.findOne();

        assert.equal(request.offers[0], offer._id);
      });
    });
    describe('acceptOffer', () => {
      beforeEach(() => {
        const acceptOffer = Meteor.server.method_handlers['acceptOffer'];
        const invocation = { consumerId };
    
        const offerId = Offers.insert({
        });
        const requestId = Requests.insert({
        });
        const transactionId = Transactions.insert({
        });

        acceptOffer.apply(invocation, [transactionId, requestId, offerId, driverId]); 
      });

      it('should delete request', () => {
        assert.equal(Requests.find().count(), 0);
      });
      it('should delete offer', () => {
        assert.equal(Offers.find().count(), 0);
      });
      it('should update transactions with driver ID', () => {
        const transaction = Transactions.findOne();

        assert.equal(transaction.driverId, driverId);
      });
    });
  });
}
