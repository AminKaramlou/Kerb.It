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
  
  func drawRoute(origin: CLLocation, destination: CLLocation) {
    fetchPolylineWithOrigin(origin, destination: destination) { polyline in
      let originMarker = GMSMarker(position: origin.coordinate)
      originMarker.map = self.mapView
      let destinationMarker = GMSMarker(position: destination.coordinate)
      destinationMarker.map = self.mapView
      polyline.map = self.mapView
    }
  }
  
  func fetchPolylineWithOrigin(origin: CLLocation, destination: CLLocation,
                               completionHandler: GMSPolyline->Void) {
    let originString = "\(origin.coordinate.latitude),\(origin.coordinate.longitude)"
    let destinationString = "\(destination.coordinate.latitude),\(destination.coordinate.longitude)"
    let directionsAPI = "https://maps.googleapis.com/maps/api/directions/json?"
    let directionsUrlString = "\(directionsAPI)&origin=\(originString)&destination=\(destinationString)&mode=driving"
    let directionsUrl = NSURL(string: directionsUrlString)!
  
    print (directionsUrl)
    let fetchDirectionsTask = NSURLSession.sharedSession().dataTaskWithURL(directionsUrl) {
      (data, response, error) in
      let json = try! NSJSONSerialization.JSONObjectWithData(data!, options: .AllowFragments)
      if (error != nil) {
        return;
      }
      
      let routesArray = json.objectForKey("routes")!
  
      if (routesArray.count > 0) {
        let routeDict = routesArray[0]
        let routeOverviewPolyline = routeDict.objectForKey("overview_polyline")!
        let points = routeOverviewPolyline.objectForKey("points") as! String
        dispatch_async(dispatch_get_main_queue()) {
          let path = GMSPath(fromEncodedPath: points)
          let polyline = GMSPolyline(path: path)
          completionHandler(polyline)
        }
      }
    }
    
    fetchDirectionsTask.resume()
  }
  
  override func viewDidLoad() {
    super.viewDidLoad()
    locationManager.delegate = self
    locationManager.startUpdatingLocation()
    mapView.myLocationEnabled = true
    mapView.settings.myLocationButton = true
  }
  
  @IBAction func didSetLocation(sender: AnyObject) {
    let origin = CLLocation(latitude: mapView.camera.target.latitude, longitude: mapView.camera.target.longitude)
    let destination = CLLocation(latitude: mapView.camera.target.latitude + 2, longitude: mapView.camera.target.longitude)
    drawRoute(origin, destination: destination)
//    next.latitude = mapView.camera.target.latitude
//    next.longitude = mapView.camera.target.longitude
//    presentViewController(next, animated: true, completion: nil)
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