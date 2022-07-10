//
//  OpeningHours.swift
//  quebuy
//
//  Created by Marcel Wernisch on 04.04.22.
//

import Foundation

struct OpeningHours: Codable {
    
    var weekday: String // -> is not the final solution
    var startTime: Int64
    var endTime: Int64 // -> it is not the final solution
    var closed: Bool
}
