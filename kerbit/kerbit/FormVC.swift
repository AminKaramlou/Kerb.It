//
//  FormVC.swift
//  kerbit
//
//  Created by Saurav Mitra on 22/05/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import UIKit

class FormVC: UIViewController, UINavigationControllerDelegate, UIImagePickerControllerDelegate {
  @IBOutlet weak var postcode: UITextField!
  @IBOutlet weak var imageView: UIImageView!
  @IBOutlet weak var bidWindow: UISlider!
  @IBOutlet weak var sizeRequired: UISlider!
  @IBOutlet weak var _description: UITextView!
  var image: UIImage!
  
  override func viewDidLoad() {
    imageView.image = image
  }
  
  @IBAction func didSubmitForm() {
    Meteor.callMethodWithName("makeRequest", parameters: [Meteor.userID!, "Test Title", "Test Description", bidWindow.value * 21640, sizeRequired.value * 10, postcode.text!])
  }
}