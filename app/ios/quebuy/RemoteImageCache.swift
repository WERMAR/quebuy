//
//  RemoteImageCache.swift
//  quebuy
//
//  Created by Marcel Wernisch on 07.04.22.
//

import SwiftUI

class RemoteImageCache: NSCache<NSString, UIImage>, ObservableObject {
    
    func cache(_ image: UIImage, for key: String) {
        self.setObject(image, forKey: key as NSString)
    }
    
    func getImage(for key: String) -> UIImage? {
        self.object(forKey: key as NSString)
    }
}

