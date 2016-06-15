//
//  Item.swift
//  kerbit
//
//  Created by Saurav Mitra on 15/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import CoreData

class Item: NSManagedObject {
  @NSManaged var consumerId: String
  @NSManaged var imageIds: [String]
  @NSManaged var descriptio: String
  @NSManaged var sizeRequired: Int64
  @NSManaged var createdAt: NSDate
}