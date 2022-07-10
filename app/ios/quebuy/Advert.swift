//
//  Advert.swift
//  quebuy
//
//  Created by Marcel Wernisch on 04.04.22.
//

import Foundation

struct Advert: Codable, Identifiable {
    
    var id: Int64
    var shortDescription: String
    var longDescription: String
    var location: Location
    var organizationDetails: OrganizationDetails
}
