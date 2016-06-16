//
//  RequestView.swift
//  kerbit
//
//  Created by Saurav Mitra on 10/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import UIKit

class RequestView: UIView, NSFetchedResultsControllerDelegate {
  var fRC: NSFetchedResultsController!
  var displayView: UIView!
  var viewManager: ViewManager!
  let superViewManager: ViewManager
  
  init(frame: CGRect, request: Request, superViewManager: ViewManager) {
    self.superViewManager = superViewManager
    super.init(frame: frame)
    
    let requestId = DataManager.idOfObject(request)
    DataManager.subscriptionLoader.addSubscriptionWithName("offers")
    DataManager.subscriptionLoader.whenReady() {
      let descriptors = [NSSortDescriptor(key: "price", ascending: true)]
      let predicate: NSPredicate? = NSPredicate(format: "%K LIKE %@", "requestId", requestId)
      self.fRC = DataManager.findObjectsfromEntity(withName: "Offer", withDescriptors: descriptors, withPredicate: predicate, delegate: self)
      for object in self.fRC.fetchedObjects! {
        self.insertObject(object, index: nil)
      }
    }
    
    displayView = UIView(frame: CGRectMake(0, 0, frame.width, frame.height))
    
    let labelView = UILabel(frame: CGRectMake(0, 0, displayView.frame.width, displayView.frame.height))
    labelView.text = "\(request.bidWindow)"
    displayView.addSubview(labelView)
    
    viewManager = ViewManager(frame: CGRectMake(0, displayView.frame.height, frame.width, 0))
    viewManager.scrollEnabled = false
    
    addSubview(displayView)
    addSubview(viewManager)
  }
  
  
  func insertObject(object: AnyObject, index: Int?) {
    let offer = object as! Offer
    
    let view = UIView(frame: CGRectMake(0, 0, viewManager.frame.width, 100))
    view.backgroundColor = .redColor()
    
    if (index == nil) {
      viewManager.addView(view)
    } else {
      viewManager.addViewToIndex(view, index: index!)
    }
    
    superViewManager.subviewChanged()
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
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
    print(object)
    switch(type) {
    case .Insert:
      insertObject(object, index:newIndexPath!.indexAtPosition(1))
    //changes!.append(.ObjectInserted(newIndexPath!))
    case .Delete:
      viewManager.removeView(atIndex: indexPath!.indexAtPosition(1))
      superViewManager.subviewChanged()
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