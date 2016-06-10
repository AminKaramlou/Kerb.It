import { Transactions } from './collections/transactions.js'
import { Requests } from './collections/requests.js'
import { Offers } from './collections/offers.js'
import {Images} from './collections/images.js'

Meteor.methods({
  'makeRequest'(consumerId, imageId, description, bidWindow, sizeRequired,
                postcode, loc) {
    const date = new Date();

    Requests.insert({
      consumerId,
      imageId,
      description,
      bidWindow,
      sizeRequired,
      postcode,
      loc,
      offers: [],
      createdAt: new Date() 
    });
  },
  'deleteRequest'(requestId) {
    var request = Requests.findOne(requestId);
    var offers = request.offers;
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
      consumerId: request.consumerId,
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
      description: request.description,
      sizeAllocated: sizeAllocated,
      postcode: request.postcode,
      createdAt: request.createdAt,
      price: offer.price,
      driverId: offer.driverId,
      dateConfirmed: new Date(),
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
  },
  'changeEmail'(newEmail) {
    const prevEmail = Meteor.user().emails[0].address;
    Accounts.addEmail(Meteor.userId(), newEmail);
    Accounts.removeEmail(Meteor.userId(), prevEmail);
    Accounts.sendVerificationEmail(Meteor.userId(), [newEmail]);
  },
  'changeUsername'(newUsername) {
    var result = !Meteor.users.findOne({username: newUsername});
    if(result && Meteor.isServer) {
      Accounts.setUsername(Meteor.userId(),newUsername);
    };
    return result;
  }
});
