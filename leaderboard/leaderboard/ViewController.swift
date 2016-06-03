//
//  ViewController.swift
//  leaderboard
//
//  Created by Saurav Mitra on 02/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
  @IBOutlet weak var nameTextField: UITextField!
  @IBOutlet weak var scoreTextField: UITextField!
  var fRC: NSFetchedResultsController!

  override func viewDidLoad() {
    super.viewDidLoad()
    DataManager.subscriptionLoader.addSubscriptionWithName("players")
    DataManager.subscriptionLoader.whenReady() {
      let descriptors = [NSSortDescriptor(key: "score", ascending: false), NSSortDescriptor(key: "name", ascending: true)]
      self.fRC = DataManager.findObjectsfromEntity(withName: "Player", withDescriptors: descriptors)
      print("Done subscribing")
    }
  }
  
  @IBAction func didInsertPlayer(sender: AnyObject) {
    let newPlayer = DataManager.getNewObjectFromEntity(withName: "Player") as! Player
    newPlayer.name = nameTextField.text!
    newPlayer.score = Int32(scoreTextField.text!)!
    DataManager.update()
  }
  
  @IBAction func didListPlayers() {
    let res = fRC.fetchedObjects as! [NSManagedObject]
    for r in res {
      print(r)
    }
  }

  @IBAction func didRemoveFirstPlayer(sender: AnyObject) {
    let res = fRC.fetchedObjects as! [NSManagedObject]
    if (res.count > 0) {
      DataManager.remove(entityObject: res[0])
      DataManager.update()
    }
  }
  
  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }
}