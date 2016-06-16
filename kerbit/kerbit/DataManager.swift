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
    return findObjectsfromEntity(withName: entityName, withDescriptors: descriptors, withPredicate: nil, delegate: delegate)
  }
  
  class func findObjectsfromEntity(withName entityName: String, withDescriptors descriptors: [NSSortDescriptor], withPredicate predicate: NSPredicate?, delegate: NSFetchedResultsControllerDelegate) -> NSFetchedResultsController {
    let fetchRequest = NSFetchRequest(entityName: entityName)
    fetchRequest.predicate = predicate
    fetchRequest.sortDescriptors = descriptors
    let fetchedResultsController = NSFetchedResultsController(fetchRequest: fetchRequest, managedObjectContext: managedObjectContext, sectionNameKeyPath: nil, cacheName: nil)
    do {
      try fetchedResultsController.performFetch()
    } catch _ {}
    fetchedResultsController.delegate = delegate
    return fetchedResultsController
  }
  
  class func uploadImageNow(image: UIImage, completionHandler: (AnyObject? -> Void)) {
    let imageString = UIImageJPEGRepresentation(image, 0.8)!.base64EncodedStringWithOptions(.Encoding64CharacterLineLength)
    Meteor.callMethodWithName("uploadImageIOS", parameters: [imageString]) {
      (result, error) in
      completionHandler(result)
    }
  }
  
  class func objectWithId(collectionName: String, documentID: String) -> NSManagedObject {
    let objectID = Meteor.objectIDForDocumentKey(METDocumentKey(collectionName: collectionName  , documentID: documentID))
    return managedObjectContext.objectWithID(objectID)
  }
  
  class func idOfObject(object: NSManagedObject) -> String {
    return Meteor.documentKeyForObjectID(object.objectID).documentID as! String
  }
  
//  class func getImageFromURL(fileURL: NSString) -> UIImage {
//    var result: UIImage
//    var data = NSData.dataWith
//    NSData * data = [NSData dataWithContentsOfURL:[NSURL URLWithString:fileURL]];
//  result = [UIImage imageWithData:data];
//  
//  return result;
//  }
  
  class func downloadImageWithURL(imageCollection: NSString, imageId: NSString, completionBlock: (Bool, UIImage?)->Void) {
    let url = NSURL(string: "http://\(baseUrl)/cfs/files/\(imageCollection)/\(imageId)")!
    let request = NSMutableURLRequest(URL: url)
    let config = NSURLSessionConfiguration.defaultSessionConfiguration()
    let session = NSURLSession(configuration: config)
    let task = session.dataTaskWithRequest(request) {
      (data, response, error) in
      if (error != nil) {
        let image = UIImage(data: data!)
        completionBlock(true, image)
      } else {
        completionBlock(false, nil);
      }
    }
    task.resume()
  }
}