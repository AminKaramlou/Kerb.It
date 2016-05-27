import { Transactions, Requests, Offers, Markers } from './collections.js';

Meteor.methods({
  'makeRequest'(consumerId, bidWindow, sizeRequired) {
    const date = new Date();

    const transactionId = Transactions.insert({
      consumerId,
      date
    });

    Requests.insert({
      consumerId,
      bidWindow,
      sizeRequired,
      sizeAllocated: sizeRequired, //to change later
      transactionId,
      offers: [],
      date
    });
  },

  'makeOffer'(requestId, driverId, price) {
    const request = Requests.findOne(requestId);

    const offerId = Offers.insert({
      requestId,
      consumerId: request.consumerId,
      transactionId: request.transactionId,
      driverId,
      price,
      date: new Date()
    });

    request.offers.push(offerId);
    //Does modifying the object change the database? Doubt it.

    Requests.update(requestId, {
      $set: {
        offers: request.offers
      }
    });
  },
  'acceptOffer'(transactionId, requestId, offerId, driverId, size_allocated, price) {
    Requests.remove(requestId);
    Offers.remove(offerId);
    Transactions.update(transactionId, {
      $set: {
        //size_allocated,
        price,
        driverId,
        dateConfirmed: new Date()
      }
    });
  },
  'addMarker'(latitude, longitude) {
    Markers.insert({
      latitude,
      longitude
    });
  },
  'updateMarker'(markerId, latitude, longitude) {
    Markers.update(markerId, {
      $set: {
        latitude,
        longitude
      }
    });
  }
});
