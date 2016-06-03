//
//  DataManager.swift
//  leaderboard
//
//  Created by Saurav Mitra on 03/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

class DataManager: NSObject, NSFetchedResultsControllerDelegate {
  static var managedObjectContext: NSManagedObjectContext!
  static var subscriptionLoader: SubscriptionLoader!
  static var fetchedResultsControllerDelegate: DataManager!
  
  class func setup(managedObjectContext: NSManagedObjectContext) {
    self.managedObjectContext = managedObjectContext
    self.subscriptionLoader = SubscriptionLoader()
    self.fetchedResultsControllerDelegate = DataManager()
  }
  
  class func getNewObjectFromEntity(withName entityName: String) -> NSManagedObject {
    return NSEntityDescription.insertNewObjectForEntityForName(entityName, inManagedObjectContext: managedObjectContext)
  }
  
  class func update() {
    do {
      try managedObjectContext.save()
    } catch _ {}
  }
  
  class func remove(entityObject object: NSManagedObject) {
    managedObjectContext.deleteObject(object)
    update()
  }
  
  class func findObjectsfromEntity(withName entityName: String, withDescriptors descriptors: [NSSortDescriptor]) -> NSFetchedResultsController {
    let fetchRequest = NSFetchRequest(entityName: entityName)
    fetchRequest.sortDescriptors = descriptors
    let fetchedResultsController = NSFetchedResultsController(fetchRequest: fetchRequest, managedObjectContext: managedObjectContext, sectionNameKeyPath: nil, cacheName: nil)
    do {
      try fetchedResultsController.performFetch()
    } catch _ {}
    fetchedResultsController.delegate = fetchedResultsControllerDelegate
    return fetchedResultsController
  }
  
  @objc internal func controllerWillChangeContent(controller: NSFetchedResultsController) {
    print(1)
    //changes = [ChangeDetail]()
  }
  
  @objc internal func controller(controller: NSFetchedResultsController, didChangeSection sectionInfo: NSFetchedResultsSectionInfo, atIndex sectionIndex: Int, forChangeType type: NSFetchedResultsChangeType) {
    print(2)
//    switch(type) {
//    case .Insert:
//      changes!.append(.SectionInserted(sectionIndex))
//    case .Delete:
//      changes!.append(.SectionDeleted(sectionIndex))
//    default:
//      break
//    }
  }
  
  @objc internal func controller(controller: NSFetchedResultsController, didChangeObject object: AnyObject, atIndexPath indexPath: NSIndexPath?, forChangeType type: NSFetchedResultsChangeType, newIndexPath: NSIndexPath?) {
    print(3)
//    switch(type) {
//    case .Insert:
//      changes!.append(.ObjectInserted(newIndexPath!))
//    case .Delete:
//      changes!.append(.ObjectDeleted(indexPath!))
//    case .Update:
//      changes!.append(.ObjectUpdated(indexPath!))
//    case .Move:
//      changes!.append(.ObjectMoved(indexPath: indexPath!, newIndexPath: newIndexPath!))
//    }
  }
  
  @objc internal func controllerDidChangeContent(controller: NSFetchedResultsController) {
    print(4)
//    didChangeContent(changes!)
//    changes = nil
  }
}