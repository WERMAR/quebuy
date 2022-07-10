//
//  WebServiceURLs.swift
//  quebuy
//
//  Created by Marcel Wernisch on 04.04.22.
//

import Foundation

enum WebServiceURLs : String {
    
    // MARK: ENVIRONMENT URLs
    case PROD_URL = "https://api.quebuy.de"
    case DEV_URL = "http://localhost:8080"
    
    // MARK: API ENDPOINTS
    
    // MARK: AUTH
    case LOGIN = "/login"
    case REFRESH = "/token/refresh"
    
    //MARK: ADVERT
    
}
