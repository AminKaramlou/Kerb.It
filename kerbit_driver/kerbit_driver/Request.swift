//
//  Request.swift
//  kerbit
//
//  Created by Saurav Mitra on 03/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import CoreData

class Request: NSManagedObject {
  @NSManaged var consumerId: String
  @NSManaged var bidWindow: Int64
  @NSManaged var createdAt: NSDate
  @NSManaged var loc: [String:AnyObject]?
  @NSManaged var itemId: String
  @NSManaged var isActive: Bool
  @NSManaged var isLive: Bool
}