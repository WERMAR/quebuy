//
//  quebuyApp.swift
//  quebuy
//
//  Created by Marcel Wernisch on 23.03.22.
//

import SwiftUI

@main
struct quebuyApp: App {
    
    @StateObject var viewRouter = ViewRouter()
    @StateObject var cacheService = CacheService()
    @StateObject var remoteImageCache = RemoteImageCache()
    
    @Environment(\.scenePhase) var scenePhase
    
    let persistenceController = PersistenceController.shared
    
    var body: some Scene {
        WindowGroup {
            RoutingView(viewRouter: viewRouter).environmentObject(cacheService)
                .environmentObject(remoteImageCache)
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
        .onChange(of: scenePhase) { _ in
            persistenceController.save()
        }
    }
}
