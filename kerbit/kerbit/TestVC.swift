//
//  TestVC.swift
//  kerbit
//
//  Created by Saurav Mitra on 03/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import UIKit

class TestVC: UIViewController {
  override func viewDidLoad() {
    super.viewDidLoad()
    
    DataManager.subscriptionLoader.addSubscriptionWithName("players")
    DataManager.subscriptionLoader.whenReady() {
      print("Done subscribing")
    }
  }
}