import { Transactions } from './collections/transactions.js'
import { Requests } from './collections/requests.js'
import { Offers } from './collections/offers.js'

Meteor.methods({
  'makeRequest'(consumerId, description, bidWindow, sizeRequired, postcode) {
    const date = new Date();

    const transactionId = Transactions.insert({
      consumerId,
      description,
      sizeAllocated: sizeRequired, //to change later
      postcode,
      createdAt: date
    });

    Requests.insert({
      consumerId,
      transactionId,
      description,
      bidWindow,
      sizeRequired,
      postcode,
      offers: [],
      createdAt: date
    });
  },
  'deleteRequest'(requestId) {
    Requests.remove(requestId);
  },
  'makeOffer'(requestId, driverId, price) {
    console.log(requestId);
    console.log(driverId);
    console.log(price);
    const request = Requests.findOne(requestId);

    const offerId = Offers.insert({
      requestId,
      consumerId: request.consumerId,
      transactionId: request.transactionId,
      driverId,
      price,
      createdAt: new Date()
    });

    request.offers.push(offerId);

    Requests.update(requestId, {
      $set: {
        offers: request.offers
      }
    });
  },
  'acceptOffer'(transactionId, requestId, offerId, driverId, sizeAllocated, price) {
    Requests.remove(requestId);
    Offers.remove(offerId);
    Transactions.update(transactionId, {
      $set: {
        //sizeAllocated,
        price,
        driverId,
        dateConfirmed: new Date()
      }
    });
  }
});
