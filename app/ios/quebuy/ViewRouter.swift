//
//  ViewRouter.swift
//  quebuy
//
//  Created by Marcel Wernisch on 04.04.22.
//

import Foundation

class ViewRouter: ObservableObject {
    @Published var currentPage: PageEnum
    
    init() {
        if !UserDefaults.standard.bool(forKey: "didLaunchBefore") {
            UserDefaults.standard.set(true, forKey: "didLaunchBefore")
            currentPage = PageEnum.START
        } else {
            currentPage = PageEnum.LOGIN
        }
    }
    
}
