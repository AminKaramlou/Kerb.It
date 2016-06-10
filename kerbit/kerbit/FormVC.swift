//
//  FormVC.swift
//  kerbit
//
//  Created by Saurav Mitra on 22/05/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import UIKit

class FormVC: UIViewController, UINavigationControllerDelegate, UIImagePickerControllerDelegate {
  @IBOutlet weak var imageView: UIImageView!
  @IBOutlet weak var bidWindow: UISlider!
  @IBOutlet weak var sizeRequired: UISlider!
  @IBOutlet weak var _description: UITextView!
  var image: UIImage!
  
  var latitude: Double!
  var longitude: Double!
  
  override func viewDidLoad() {
    imageView.image = image
  }
  
  @IBAction func didSubmitForm() {
    DataManager.uploadImageNow(image) {result in
      let imageId = result!
      Meteor.callMethodWithName("makeRequest", parameters: [Meteor.userID!, imageId, self._description.text!, Int(self.bidWindow.value * 20160 + 1), Int(self.sizeRequired.value * 10 + 1), self.longitude, self.latitude])
    }
  }
}