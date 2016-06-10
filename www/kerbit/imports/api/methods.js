import { Transactions } from './collections/transactions.js'
import { Requests } from './collections/requests.js'
import { Offers } from './collections/offers.js'
import {Images} from './collections/images.js'
import {Items}  from './collections/items.js'

Meteor.methods({
  'makeRequest'(consumerId, imageIds, description, bidWindow, sizeRequired,
                loc) {
    const date = new Date();
    
    const itemId = Items.insert({
      consumerId,
      imageIds,
      description,
      sizeRequired,
      createdAt: date,
    });

    const requestId = Requests.insert({
      consumerId,
      bidWindow,
      createdAt: date,
      itemId,
      loc,
      isActive: true,
      isLive: true
    });

    Meteor.setTimeout(function() {
      Requests.update(requestId, {
        $set: {
          isLive: false
        }
      });
    }, bidWindow * 60000);
  },
  'deleteRequest'(requestId) {
    var request = Requests.findOne(requestId);
    Requests.update(requestId, {
      $set: {
        isActive: false
      }
    });
  },
  'makeOffer'(requestId, driverId, price) {
    Offers.insert({
      requestId,
      driverId,
      price,
      createdAt: new Date()
    });

  },
  'updateOffer'(offerId, price) {
    Offers.update(offerId, {
      $set: {
        price
      }
    });
  },
  'acceptOffer'(requestId, offerId) {
    const request = Requests.findOne(requestId);
    const offer = Offers.findOne(offerId);
    Transactions.insert({
      consumerId: request.consumerId,
      driverId: offer.driverId,
      dateConfirmed: new Date(),
      finalOffer: offerId,
      item: request.itemId,
      isCompleted: false,
      hasLeftFeedback: false,
      feedbackScore: 0
    });

    Meteor.call('deleteRequest', requestId);
  },
  'collect'(orderId) {
    Transactions.update(orderId, {
      $set: {
        isCompleted: true,
        dateCompleted: new Date()
      }
    });
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
