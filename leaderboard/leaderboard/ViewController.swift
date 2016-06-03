//
//  ViewController.swift
//  leaderboard
//
//  Created by Saurav Mitra on 02/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

  override func viewDidLoad() {
    super.viewDidLoad()
    let fetchRequest = NSFetchRequest(entityName: "Player")
    fetchRequest.sortDescriptors = [NSSortDescriptor(key: "score", ascending: false), NSSortDescriptor(key: "name", ascending: true)]
    let fetchedResultsController = NSFetchedResultsController(fetchRequest: fetchRequest, managedObjectContext: Meteor.mainQueueManagedObjectContext, sectionNameKeyPath: nil, cacheName: nil)
    do {
      try fetchedResultsController.performFetch()
    } catch _ {}
    fetchedResultsController.delegate = DataManager.fetchedResultsControllerDelegate
    let res = fetchedResultsController.fetchedObjects as! [NSManagedObject]
    for r in res {
      print(r)
    }
  }
  
  @IBAction func clickButton() {
    let fetchRequest = NSFetchRequest(entityName: "Player")
    fetchRequest.sortDescriptors = [NSSortDescriptor(key: "score", ascending: false), NSSortDescriptor(key: "name", ascending: true)]
    let fetchedResultsController = NSFetchedResultsController(fetchRequest: fetchRequest, managedObjectContext: Meteor.mainQueueManagedObjectContext, sectionNameKeyPath: nil, cacheName: nil)
    do {
      try fetchedResultsController.performFetch()
    } catch _ {}
    fetchedResultsController.delegate = DataManager.fetchedResultsControllerDelegate
    let res = fetchedResultsController.fetchedObjects as! [NSManagedObject]
    for r in res {
      print(r)
    }
  }

  override func didReceiveMemoryWarning() {
    super.didReceiveMemoryWarning()
    // Dispose of any resources that can be recreated.
  }

}

