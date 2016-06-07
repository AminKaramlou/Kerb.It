import { Transactions } from './collections/transactions.js'
import { Requests } from './collections/requests.js'
import { Offers } from './collections/offers.js'
import {Images} from './collections/images.js'
import {Items}  from './collections/items.js'

Meteor.methods({
  'makeRequest'(consumerId, imageId, description, bidWindow, sizeRequired,
                loc) {
    const date = new Date();
    
    var id = Item.insert({
      consumerId: consumerId,
      imageId: imageId,
      description: description,
      bidWindow: bidWindow,
      sizeRequired: sizeRequired,
      loc: loc,
      createdAt: date
    });

    Requests.insert({
      consumerId: consumerId,
      bidWindow: bidWindow,
      createdAt: date,
      item: id
      
    });
  },
  'deleteRequest'(requestId) {
    var request = Requests.findOne(requestId);
    var item = Items.findOne(requestId);
    Items.remove(item._id);
    var offers = Offers.find({requestId: requestId});
    for (var i in offers) {
      var offerId = offers[i];
      Offers.remove(offerId);
    }
    Images.remove(request.imageId);
    Requests.remove(requestId);
  },
  'makeOffer'(requestId, driverId, price) {
    const request = Requests.findOne(requestId);
    const offers = request.offers;
    const offerId = Offers.insert({
      requestId,
      driverId,
      price,
      createdAt: new Date()
    });

    offers.push(offerId);

  },
    'collect'(orderId) {


        Transactions.update(orderId, {
            $set: {
                isCompleted: true,
                dateCompleted: new Date()
            }
        });
    },
  'acceptOffer'(requestId, offerId, sizeAllocated) {
    const request = Requests.findOne(requestId);
    const offer = Offers.findOne(offerId);
    Transactions.insert({
      consumerId: request.consumerId,
      driverId: offer.driverId,
      dateConfirmed: new Date(),
      finalOffer: offerId,
      item: request.item,
      isCompleted: false,
      hasLeftFeedback: false,
      feedbackScore: 0
    });
    Meteor.call('deleteRequest', requestId);
  },
  'rateDriver'(driverId, rating) {
    /*
     Pseudo-correct way of doing ratings (much more complicated EWMAs)
     http://stackoverflow.com/questions/1411199/what-is-a-better-way-to-sort-by-a-5-star-rating
     http://www.evanmiller.org/how-not-to-sort-by-average-rating.html
     */

    var user = Meteor.users.findOne(driverId);
    var currentRating = user.rating;
    var newRating = 0;
    if (currentRating == null) {
      newRating = rating;
    } else {
      newRating = (0.6*currentRating + 0.4*rating);
    }
    Meteor.users.update(driverId, {
      $set: {
        rating: newRating
      }
    });
  },

  'leaveFeedback'(transId, rating) {
    Transactions.update(transId, {
      $set: {
        hasLeftFeedback: true,
        dateRated: new Date(),
        feedbackScore: rating
      }
    });
  }
});
