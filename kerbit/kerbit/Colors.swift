//
//  Colors.swift
//  kerbit
//
//  Created by Saurav Mitra on 16/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

let Colors = [
  "color1": UIColor(red: 0.267, green: 0.298, blue: 0.298, alpha: 1.0),
  "color2": UIColor(red: 0.471, green: 0.647, blue: 0.639, alpha: 1.0),
  "color3": UIColor(red: 0.973, green: 0.961, blue: 0.949, alpha: 1.0)
]

import UIKit

class DefaultButton: UIButton {
  override init(frame: CGRect) {
    super.init(frame: frame)
    setup()
  }
  
  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
    setup()
  }
  
  func setup() {
    //backgroundColor = Colors["color2"]
    layer.cornerRadius = 4.0
  }
}