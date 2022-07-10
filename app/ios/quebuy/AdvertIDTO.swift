//
//  AdvertIDTO.swift
//  quebuy
//
//  Created by Marcel Wernisch on 11.01.22.
//

import Foundation

struct AdvertIDTO: Codable {
    
    init(advertIds: [Int64]) {
        self.advertIds = advertIds
    }
    
    var advertIds: [Int64]
}
