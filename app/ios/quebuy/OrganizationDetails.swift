//
//  OrganizationDetails.swift
//  quebuy
//
//  Created by Marcel Wernisch on 04.04.22.
//

import Foundation

struct OrganizationDetails: Codable {
    
    var organizationName: String
    var telephoneNumber: String
    var mail: String
    var logoName: String
    var openingHours: [OpeningHours]
}
