//
//  POI.swift
//  quebuy
//
//  Created by Marcel Wernisch on 12.12.21.
//

import Foundation

struct POI : Codable {
    var longitude: Double
    var latitude: Double
    var name: String
    var hotspot: Bool
    var adverts: [Int64]
}


struct POIRequest: Codable {
    var longitude: Double
    var latitude: Double
    var ratio: Int
}
