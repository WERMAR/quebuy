//
//  AuthDataStruct.swift
//  quebuy
//
//  Created by Marcel Wernisch on 04.04.22.
//

import Foundation
import UIKit


struct AuthDataStruct: Codable {
    var access_token : String
    var refresh_token: String
}
