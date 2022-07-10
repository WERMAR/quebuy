//
//  MapDelegate.swift
//  quebuy
//
//  Created by Marcel Wernisch on 04.04.22.
//

import Foundation
import MapKit

protocol MapDelegate {
    
    func regionDidChanged(_ region: MKCoordinateRegion)
}
