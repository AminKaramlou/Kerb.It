//
//  Player.swift
//  leaderboard
//
//  Created by Saurav Mitra on 03/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import CoreData

class Player: NSManagedObject {
  @NSManaged var name: String!
  @NSManaged var score: Int32
}