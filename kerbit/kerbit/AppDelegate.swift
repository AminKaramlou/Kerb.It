//
//  AppDelegate.swift
//  leaderboard
//
//  Created by Saurav Mitra on 02/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import UIKit

let productionURL = "wss://kerbit.co.uk/websocket" //Not sure whether this is the correct URL
let localURL = "ws://localhost:3000/websocket"
let Meteor = METCoreDataDDPClient(serverURL: NSURL(string: localURL)!)

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?
  let googleMapsApiKey = "AIzaSyA1lDKRXDU95wdG-oauCWM6978eCkrXODw"
  
  func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
    GMSServices.provideAPIKey(googleMapsApiKey)
    Meteor.connect()
    DataManager.setup(Meteor.mainQueueManagedObjectContext)
    Meteor.loginWithEmail("mitrasaurav97@gmail.com", password: "obyron", completionHandler: nil);
    return true
  }

  func applicationWillResignActive(application: UIApplication) {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
  }

  func applicationDidEnterBackground(application: UIApplication) {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
  }

  func applicationWillEnterForeground(application: UIApplication) {
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
  }

  func applicationDidBecomeActive(application: UIApplication) {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
  }

  func applicationWillTerminate(application: UIApplication) {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
  }


}

