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
  
  class func uploadImageNow(image: UIImage) {
    let imageData = UIImageJPEGRepresentation(image, 0.5)!
    let put = NSMutableURLRequest(URL: NSURL(string: "http://\(baseUrl)/cfs/files/images/")!)
    put.HTTPMethod = "PUT"
    put.HTTPBody = imageData
    put.setValue("image/jpg", forHTTPHeaderField: "Content-Type")
    put.setValue("\(imageData.length)", forHTTPHeaderField: "Content-Length")
    let config = NSURLSessionConfiguration.defaultSessionConfiguration()
    let session = NSURLSession(configuration: config)
    let task = session.dataTaskWithRequest(put) {
      (data, response, error) in
      print(response)
      print(error)
      let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
      print (responseString)
    }
    print("http://\(baseUrl)/cfs/files/images/")
    task.resume()
  }
}