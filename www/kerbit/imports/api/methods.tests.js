import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';
 
import { Requests } from './collections/requests.js';
import { Offers } from './collections/offers.js';
import { Transactions } from './collections/transactions.js';
import './methods.js';
 
if (Meteor.isServer) {
  describe('API methods', () => {
    const consumerId = Random.id();
    const driverId = Random.id();

    const description = "Test Description";
    const bidWindow = 7;
    const sizeRequired = 7;
    const postcode = "SW72AZ";
    beforeEach(() => {
      Transactions.remove({});
      Requests.remove({});
      Offers.remove({});
    });

    describe('makeRequest', () => {
      beforeEach(() => {
        const makeRequest = Meteor.server.method_handlers['makeRequest'];
        const invocation = { consumerId };

        makeRequest.apply(invocation, [consumerId, description, bidWindow, sizeRequired, postcode]); 
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
        const invocation = { userId: driverId };
    
        const transactionId = Random.id();
        const requestId = Requests.insert({
          consumerId,
          transactionId,
          description,
          bidWindow,
          sizeRequired,
          postcode,
          offers: [],
          createdAt: new Date()
        });
        const price = 1000;
        makeOffer.apply(invocation, [requestId, driverId, price]); 
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
    
        const sizeAllocated = 7;
        const price = 1000;
        const date = new Date();
        const transactionId = Transactions.insert({
          consumerId,
          description,
          sizeAllocated,
          postcode,
          createdAt: date
        });
        const requestId = Requests.insert({
          consumerId,
          transactionId,
          description,
          bidWindow,
          sizeRequired: sizeAllocated,
          postcode,
          offers: [],
          createdAt: date
        });
        const offerId = Offers.insert({
          requestId,
          consumerId,
          transactionId,
          driverId,
          price,
          createdAt: date
        });
        acceptOffer.apply(invocation, [transactionId, requestId, offerId, driverId, sizeAllocated, price]); 
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
