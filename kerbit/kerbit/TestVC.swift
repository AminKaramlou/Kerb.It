//
//  TestVC.swift
//  kerbit
//
//  Created by Saurav Mitra on 03/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import UIKit

class TestVC: UIViewController, NSFetchedResultsControllerDelegate {
  var frc: NSFetchedResultsController!
  override func viewDidLoad() {
    super.viewDidLoad()
    
    DataManager.subscriptionLoader.whenReady() {
      //let descriptors = [NSSortDescriptor(key: "price", ascending: true)]
      let descriptors: [NSSortDescriptor] = []
      self.frc = DataManager.findObjectsfromEntity(withName: "Request", withDescriptors: descriptors, delegate: self)
      let objs = self.frc.fetchedObjects as! [NSManagedObject]
      print(objs)
      for obj in objs {
        print()
        print(obj)
        
      }
    }
  }
  
  @objc internal func controllerWillChangeContent(controller: NSFetchedResultsController) {
    //changes = [ChangeDetail]()
  }
  
  @objc internal func controller(controller: NSFetchedResultsController, didChangeSection sectionInfo: NSFetchedResultsSectionInfo, atIndex sectionIndex: Int, forChangeType type: NSFetchedResultsChangeType) {
    //      switch(type) {
    //      case .Insert:
    //        //changes!.append(.SectionInserted(sectionIndex))
    //      case .Delete:
    //        print(fRC.fetchedObjects)
    //        //changes!.append(.SectionDeleted(sectionIndex))
    //      default:
    //        break
    //      }
  }
  
  @objc internal func controller(controller: NSFetchedResultsController, didChangeObject object: AnyObject, atIndexPath indexPath: NSIndexPath?, forChangeType type: NSFetchedResultsChangeType, newIndexPath: NSIndexPath?) {
    switch(type) {
    case .Insert:
      print(frc.fetchedObjects)
    //changes!.append(.ObjectInserted(newIndexPath!))
    case .Delete:
      print(frc.fetchedObjects)
    //changes!.append(.ObjectDeleted(indexPath!))
    case .Update:
      print(frc.fetchedObjects)
    //changes!.append(.ObjectUpdated(indexPath!))
    case .Move:
      print(frc.fetchedObjects)
      //changes!.append(.ObjectMoved(indexPath: indexPath!, newIndexPath: newIndexPath!))
    }
  }
  
  @objc internal func controllerDidChangeContent(controller: NSFetchedResultsController) {
    //    didChangeContent(changes!)
    //    changes = nil
  }

}