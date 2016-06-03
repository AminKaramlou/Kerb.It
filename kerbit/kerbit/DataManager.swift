//
//  DataManager.swift
//  leaderboard
//
//  Created by Saurav Mitra on 03/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

class DataManager {
  static var managedObjectContext: NSManagedObjectContext!
  static var subscriptionLoader: SubscriptionLoader!
  
  class func setup(managedObjectContext: NSManagedObjectContext) {
    self.managedObjectContext = managedObjectContext
    self.subscriptionLoader = SubscriptionLoader()
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
  
  class func findObjectsfromEntity(withName entityName: String, withDescriptors descriptors: [NSSortDescriptor], delegate: NSFetchedResultsControllerDelegate) -> NSFetchedResultsController {
    let fetchRequest = NSFetchRequest(entityName: entityName)
    fetchRequest.sortDescriptors = descriptors
    let fetchedResultsController = NSFetchedResultsController(fetchRequest: fetchRequest, managedObjectContext: managedObjectContext, sectionNameKeyPath: nil, cacheName: nil)
    do {
      try fetchedResultsController.performFetch()
    } catch _ {}
    fetchedResultsController.delegate = delegate
    return fetchedResultsController
  }
}