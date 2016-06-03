import { Transactions } from './collections/transactions.js'
import { Requests } from './collections/requests.js'
import { Offers } from './collections/offers.js'
import {Images} from './collections/images.js'

Meteor.methods({
  'makeRequest'(consumerId, imageId, description, bidWindow, sizeRequired, postcode) {
    Requests.insert({
      consumerId,
      imageId,
      transactionId,
      description,
      bidWindow,
      sizeRequired,
      postcode,
      offers: [],
      createdAt: new Date() 
    });
  },
  'deleteRequest'(requestId) {
    // Remove offers associated with this request
    var request = Requests.findOne(requestId);
    var offers = request.offers;
    for (var i in offers) {
      var offerId = offers[i];
      Offers.remove(offerId);
    }
    Images.remove({_id:request.imageId});
    // Remove this request
    Requests.remove(requestId);
  },
  'makeOffer'(requestId, driverId, price) {
    const offers = Requests.findOne(requestId).offers;
    const offerId = Offers.insert({
      requestId,
      consumerId: request.consumerId,
      transactionId: request.transactionId,
      driverId,
      price,
      createdAt: new Date()
    });

    offers.push(offerId);

    Requests.update(requestId, {
      $set: {
        offers: offers
      }
    });
  },
  'acceptOffer'(requestId, offerId, sizeAllocated) {
    const request = Requests.findOne(requestId);
    const offer = Offers.findOne(offerId);
    Transactions.insert({
      consumerId: request.consumerId,
      description: request.description,
      sizeAllocated: sizeAllocated,
      postcode: request.postcode,
      createdAt: request.createdAt,
      price: offer.price,
      driverId: offer.driverId,
      dateConfirmed: new Date()
    })
    Requests.remove(requestId);
    Offers.remove(offerId);
  }
});
