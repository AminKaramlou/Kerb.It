//
//  ViewManager.swift
//  kerbit
//
//  Created by Saurav Mitra on 14/06/2016.
//  Copyright © 2016 APTSD. All rights reserved.
//

import UIKit

class ViewManager: UIScrollView {
  let viewSpace: CGFloat = 20
  var views: [UIView] = []
  
  func sizeOfContent() -> CGSize {
    return views.count == 0 ? CGSizeZero
                            : CGSizeMake(frame.width,
                                         views[views.count-1].frame.origin.y +
                                         views[views.count-1].frame.height)
  }
  func addView(view: UIView) {
    addViewToIndex(view, index: views.count)
  }
  
  func addViewToIndex(view: UIView, index: Int) {
    view.frame.origin.y = index == 0 ? 0 : views[index-1].frame.origin.y + views[index-1].frame.height + viewSpace
    let ydiff = view.frame.height + viewSpace
    for i in index..<views.count {
      views[i].frame.origin.y += ydiff
    }
    views.insert(view, atIndex: index)
    addSubview(view)
    contentSize = sizeOfContent()
  }
  
  func moveView(index: Int, newIndex: Int) {
    let movedView = views.removeAtIndex(index)
    let ydiff = movedView.frame.height + viewSpace
    if newIndex > index {
      for i in index..<newIndex {
        views[i].frame.origin.y -= ydiff
      }
    } else if (index > newIndex) {
      for i in newIndex..<index {
        views[i].frame.origin.y += ydiff
      }
    }
    movedView.frame.origin.y = newIndex == 0 ? 0 : views[newIndex-1].frame.origin.y + views[newIndex-1].frame.height + viewSpace
    views.insert(movedView, atIndex: newIndex)
  }
  
  func removeView(atIndex index: Int) {
    let removedView = views.removeAtIndex(index)
    removedView.removeFromSuperview()
    let ydiff = removedView.frame.height + viewSpace
    for i in index..<views.count {
      views[i].frame.origin.y -= ydiff
    }
    contentSize = sizeOfContent()
  }
}