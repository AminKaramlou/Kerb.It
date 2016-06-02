//
//  SubscriptionLoader.swift
//  leaderboard
//
//  Created by Saurav Mitra on 02/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

protocol SubscriptionLoaderDelegate: class {
  func subscriptionLoader(subscriptionLoader: SubscriptionLoader, subscription: METSubscription, didFailWithError error: NSError)
}

class SubscriptionLoader {
  weak var delegate: SubscriptionLoaderDelegate? = nil
  private var subscriptions: [METSubscription] = []
  
  deinit {
    removeAllSubscriptions()
  }
  
  func addSubscriptionWithName(name: String, parameters: AnyObject...) -> METSubscription {
    let subscription = Meteor.addSubscriptionWithName(name, parameters: parameters)
    subscription.whenDone { (error) -> Void in
      if let error = error {
        self.delegate?.subscriptionLoader(self, subscription: subscription, didFailWithError: error)
      }
    }
    subscriptions.append(subscription)
    return subscription
  }
  
  func removeAllSubscriptions() {
    for subscription in subscriptions {
      Meteor.removeSubscription(subscription)
    }
  }
  
  var isReady: Bool {
    for subscription in subscriptions {
      if (!subscription.ready) {
        return false
      }
    }
    return true
  }
  
  func whenReady(handler: () -> Void) {
    // Invoke completion handler synchronously if we're ready now
    if isReady {
      handler()
      return
    }
    
    let group = dispatch_group_create()
    for subscription in subscriptions {
      dispatch_group_enter(group)
      subscription.whenDone { (error) -> Void in
        dispatch_group_leave(group)
      }
    }
    
    dispatch_group_notify(group, dispatch_get_main_queue(), handler)
  }
}