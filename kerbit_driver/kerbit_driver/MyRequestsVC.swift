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
  @IBOutlet weak var viewManager: ViewManager!
  var colors: [UIColor] = [.redColor(), .blackColor(), .blueColor(), .greenColor()]
  
  override func viewDidLoad() {
    super.viewDidLoad()
    
    DataManager.subscriptionLoader.addSubscriptionWithName("offers")
    DataManager.subscriptionLoader.whenReady() {
      let descriptors = [NSSortDescriptor(key: "price", ascending: true)]
      self.fRC = DataManager.findObjectsfromEntity(withName: "Offer", withDescriptors: descriptors, delegate: self)
      print(self.fRC.fetchedObjects)
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
      let view = UIView(frame: CGRectMake(0, 0, viewManager.frame.width, 200))
      view.backgroundColor = colors[0]
      colors.append(colors.removeAtIndex(0))
      viewManager.addViewToIndex(view, index: newIndexPath!.indexAtPosition(1))
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
