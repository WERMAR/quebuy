//
//  CacheService.swift
//  quebuy
//
//  Created by Marcel Wernisch on 07.04.22.
//

import Foundation
import SwiftUI

class CacheService: ObservableObject {
    
    private var cacheDir: [CacheConst: Any] = [:]
    
    func addItem(_ id: CacheConst, _ data: Any) {
        Swift.print("Item for CacheConst: \(id) added -> \(data)")
        self.cacheDir[id] = data
    }
    
    func print() {
        for data in cacheDir {
            Swift.print("Data: \(data)")
        }
    }
    
    func getItem(_ id: CacheConst) -> Any? {
        return self.cacheDir[id]
    }
}

enum CacheConst {
    case AUTHENTICATION, ADVERT_IDS
}
