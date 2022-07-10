//
//  HomeView.swift
//  quebuy
//
//  Created by Marcel Wernisch on 26.11.21.
//

import SwiftUI

struct HomeView: View {
    
    @State private var selection = 2

    init() {
        UITabBar.appearance().backgroundColor = UIColor.systemGray6
    }
    
    var body: some View {
        
        VStack {
            TabView(selection:$selection) {
                HistoryView()
                    .tabItem {
                        Image(systemName: "bookmark.fill")
                        Text("Gespeichert")
                    }.tag(1)
                MapView()
                    .edgesIgnoringSafeArea(.top)
                    .tabItem {
                        Image(systemName: "map.circle.fill")
                        Text("Karte")
                    }.tag(2)
                HistoryView()
                    .tabItem {
                        Image(systemName: "clock.arrow.circlepath")
                        Text("History")
                    }.tag(3)
            }
            .accentColor(.primaryGreen)
        }
    }
}


struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView().environmentObject(CacheService())
    }
}
