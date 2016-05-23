//
//  HomeVC.swift
//  kerbit
//
//  Created by Saurav Mitra on 22/05/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import UIKit

class HomeVC: UIViewController, UINavigationControllerDelegate, UIImagePickerControllerDelegate {
  var imagePicker: UIImagePickerController!
  var image: UIImage!
  
  @IBAction func takePhoto(sender: AnyObject) {
    imagePicker = UIImagePickerController()
    imagePicker.delegate = self
    imagePicker.sourceType = .PhotoLibrary
    
    presentViewController(imagePicker, animated: true, completion: nil)
  }
  
  func imagePickerController(picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : AnyObject]) {
    imagePicker.dismissViewControllerAnimated(true, completion: nil)
    let formVC: FormVC = storyboard!.instantiateViewControllerWithIdentifier("formVC") as! FormVC
    formVC.image = info[UIImagePickerControllerOriginalImage] as? UIImage
    
    let pickupVC: PickupLocationVC = storyboard!.instantiateViewControllerWithIdentifier("pickupLocationVC") as! PickupLocationVC
    pickupVC.next = formVC
    presentViewController(pickupVC, animated: true, completion: nil)
  }
}