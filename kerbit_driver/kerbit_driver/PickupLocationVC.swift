//
//  PickupLocationVC.swift
//  kerbit
//
//  Created by Saurav Mitra on 22/05/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import UIKit

class PickupLocationVC: UIViewController {
  @IBOutlet weak var mapView: GMSMapView!
  let locationManager = CLLocationManager()
  var next: FormVC!
  
  override func viewDidLoad() {
    super.viewDidLoad()
    locationManager.delegate = self
    locationManager.startUpdatingLocation()
    mapView.myLocationEnabled = true
    mapView.settings.myLocationButton = true
  }
  
  @IBAction func didSetLocation(sender: AnyObject) {
    next.latitude = mapView.camera.target.latitude
    next.longitude = mapView.camera.target.longitude
    presentViewController(next, animated: true, completion: nil)
  }
}

extension PickupLocationVC: CLLocationManagerDelegate {
  func locationManager(manager: CLLocationManager, didChangeAuthorizationStatus status: CLAuthorizationStatus) {
    if status == .AuthorizedWhenInUse {
    }
  }
    
  func locationManager(manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
    if let location = locations.first {
      mapView.camera = GMSCameraPosition(target: location.coordinate, zoom: 15, bearing: 0, viewingAngle: 0)
      locationManager.stopUpdatingLocation()
    }
  }
}