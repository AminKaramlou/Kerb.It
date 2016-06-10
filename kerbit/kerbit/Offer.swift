//
//  Offer.swift
//  kerbit
//
//  Created by Saurav Mitra on 03/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import CoreData

class Offer: NSManagedObject {
  @NSManaged var requestId: String!
  @NSManaged var driverId: String!
  @NSManaged var price: Int64
}