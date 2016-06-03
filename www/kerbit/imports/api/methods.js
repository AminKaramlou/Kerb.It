import { Transactions } from './collections/transactions.js'
import { Requests } from './collections/requests.js'
import { Offers } from './collections/offers.js'
import {Images} from './collections/images.js'

Meteor.methods({

  'makeRequest'(consumerId, imageId, description, bidWindow, sizeRequired,
                postcode, latitude, longitude) {
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
      imageId,
      transactionId,
      description,
      bidWindow,
      sizeRequired,
      postcode,
      latitude,
      longitude,
      offers: [],
      createdAt: date
    });
  },
  'deleteRequest'(requestId) {
    // Remove offers associated with this request
    var request = Requests.findOne(requestId);
    var offers = request.offers;
    for (var i = 0; i < offers.length; i++) {
      var offerId = offers[i];
      Offers.remove(offerId);
    }
    Images.remove({_id:request.imageId});
    // Remove this request
    Requests.remove(requestId);
  },
  'makeOffer'(requestId, driverId, price) {
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
