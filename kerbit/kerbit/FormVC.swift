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
    let newRequest = DataManager.getNewObjectFromEntity(withName: "Request") as! Request
    newRequest.postcode = postcode.text!
    newRequest.consumerId = Meteor.userID!
    newRequest.bidWindow = Int64(bidWindow.value * 21640)
    newRequest.sizeRequired = Int64(sizeRequired.value * 10)
    DataManager.update()
  }
}