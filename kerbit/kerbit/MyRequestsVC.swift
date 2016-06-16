//
//  MyRequestsVCTableViewController.swift
//
//
//  Created by Saurav Mitra on 03/06/2016.
//
//

import UIKit

class MyRequestsVC: UIViewController, NSFetchedResultsControllerDelegate {
  var fRC: NSFetchedResultsController!
  var viewManager: ViewManager!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    viewManager = ViewManager(frame: CGRectMake(10, 20, 355, 399))
    
    view.addSubview(viewManager)
    
    DataManager.subscriptionLoader.addSubscriptionWithName("requests")
    DataManager.subscriptionLoader.whenReady() {
      let descriptors = [NSSortDescriptor(key: "createdAt", ascending: true)]
      self.fRC = DataManager.findObjectsfromEntity(withName: "Request", withDescriptors: descriptors, delegate: self)
      for object in self.fRC.fetchedObjects! {
        self.insertObject(object, index: nil)
      }
    }
  }
  
  func insertObject(object: AnyObject, index: Int?) {
    let request = object as! Request
    let view = RequestView(frame: CGRectMake(0, 0, viewManager.frame.width, 20),
                           request: request, superViewManager: viewManager)
    if (index == nil) {
      viewManager.addView(view)
    } else {
      viewManager.addViewToIndex(view, index: index!)
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
      insertObject(object, index: newIndexPath!.indexAtPosition(1))
    //changes!.append(.ObjectInserted(newIndexPath!))
    case .Delete:
      viewManager.removeView(atIndex: indexPath!.indexAtPosition(1))
    //changes!.append(.ObjectDeleted(indexPath!))
    case .Update:
      print(fRC.fetchedObjects!)
    //changes!.append(.ObjectUpdated(indexPath!))
    case .Move:
      viewManager.moveView(indexPath!.indexAtPosition(1), newIndex: newIndexPath!.indexAtPosition(1))
      //changes!.append(.ObjectMoved(indexPath: indexPath!, newIndexPath: newIndexPath!))
    }
  }
  
  @objc internal func controllerDidChangeContent(controller: NSFetchedResultsController) {
    //    didChangeContent(changes!)
    //    changes = nil
  }
}