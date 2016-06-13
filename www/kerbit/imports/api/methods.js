import { Transactions } from './collections/transactions.js'
import { Requests } from './collections/requests.js'
import { Offers } from './collections/offers.js'
import { Images } from './collections/images.js'
import { UserImages } from './collections/userImages.js'
import {Items}  from './collections/items.js'

Meteor.methods({
  'makeRequest'(consumerId, imageIds, description, bidWindow, sizeRequired,
                  lng, lat) {

    const loc = { type: "Point", coordinates: [lng, lat] };
    
    Meteor.users.update(consumerId, {
      $set: {
        lastLoc: loc
      }
    });

    if (typeof imageIds === 'string') {
      imageIds = [imageIds];
    }
    
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

    if (Meteor.isServer) {
      Meteor.setTimeout(function() {
        Requests.update(requestId, {
          $set: {
            isLive: false
          }
        });
      }, bidWindow * 60000);
    }
  },
  'uploadUserImage': function(imageId, userId) {

    var user = Meteor.users.findOne(userId);

    Meteor.users.update(userId, {
      $set: {
        imageId: imageId
      }
    });
  },
  'deleteRequest'(requestId) {
    var request = Requests.findOne(requestId);
    Requests.update(requestId, {
      $set: {
        isActive: false
      }
    });
  },
  'makeOffer'(requestId, driverId, price, rating) {
    const request = Requests.findOne(requestId);
    const user = Meteor.users.findOne(driverId);
    const offers = request.offers;
    const offerId = Offers.insert({
      requestId,
      driverId,
      price,
      rating,
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
    Requests.update(requestId, {
      $set: {
        isLive: false
      }
    });
    const request = Requests.findOne(requestId);
    const offer = Offers.findOne(offerId);
    Transactions.insert({
      consumerId: request.consumerId,
      driverId: offer.driverId,
      dateConfirmed: new Date(),
      finalOffer: offerId,
      itemId: request.itemId,
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
  'uploadImageIOS': function(base64Data) {
    var newFile = new FS.File();
    var fileDataBuffer = new Buffer(base64Data, 'base64');
    newFile.attachData(fileDataBuffer, {type: 'image/jpg'});

    const imageId = Images.insert(newFile)._id;
    return imageId;
  },
  'leaveFeedback'(transactionId, rating) {
    Transactions.update(transactionId, {
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
