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
  var queue = [Int: UIView]()
  
  func subviewChanged() {
    let viewsCopy = views
    views = []
    for view in viewsCopy {
      addView(view)
    }
  }
  
  func contentHeight() -> CGFloat {
    return views.count == 0 ? 0
                            : views[views.count-1].frame.origin.y +
                              views[views.count-1].frame.height
  }
  
  func addView(view: UIView) {
    addViewToIndex(view, index: views.count)
  }
  
  func addViewToIndex(view: UIView, index: Int) {
    print(index)
    if (index != 0 && index > views.count) {
      queue[index] = view
      print("Adding to queue")
    } else {
      print("Adding to view manager")
      view.frame.origin.y = index == 0 ? 0 : views[index-1].frame.origin.y + views[index-1].frame.height + viewSpace
      let ydiff = view.frame.height + viewSpace
      for i in index..<views.count {
        views[i].frame.origin.y += ydiff
      }
      views.insert(view, atIndex: index)
      addSubview(view)
      modifySize()
      if (queue[index+1] != nil) {
        addViewToIndex(queue.removeValueForKey(index+1)!, index: index + 1)
      }
    }
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
    movedView.frame.origin.y = newIndex == 0 ? 0 : views[newIndex-1].frame.origin.y +
                                                   views[newIndex-1].frame.height + viewSpace
    views.insert(movedView, atIndex: newIndex)
  }
  
  func removeView(atIndex index: Int) {
    print()
    print(views.count)
    print(index)
    let removedView = views.removeAtIndex(index)
    removedView.removeFromSuperview()
    let ydiff = removedView.frame.height + viewSpace
    for i in index..<views.count {
      views[i].frame.origin.y -= ydiff
    }
    modifySize()
  }
  
  func modifySize() {
    if (scrollEnabled) {
      contentSize.height = contentHeight()
    } else {
      let diff = contentHeight() - frame.size.height
      superview!.frame.size.height += diff
      frame.size.height += diff
    }
  }
}