//
//  RoutingView.swift
//  quebuy
//
//  Created by Marcel Wernisch on 26.11.21.
//

import SwiftUI

struct RoutingView: View {
    
    @StateObject var viewRouter: ViewRouter
    
    var body: some View {
        ZStack {
            VStack{
                if viewRouter.currentPage == PageEnum.START || viewRouter.currentPage == PageEnum.LOGIN || viewRouter.currentPage == PageEnum.REGISTER {
                    withAnimation {
                        LoginRegistrationMasterView(viewRouter: self.viewRouter)
                    }
                }
                
                if viewRouter.currentPage == PageEnum.MAP ||
                    viewRouter.currentPage == PageEnum.SAVED ||
                    viewRouter.currentPage == PageEnum.HISTORY {
                    withAnimation {
                        HomeView()
                            .transition(.opacity.animation(.easeOut))
                    }
                }
            }.zIndex(-2)
        }.ignoresSafeArea()
    }
}

struct RoutingView_Previews: PreviewProvider {
    static var previews: some View {
        RoutingView(viewRouter: ViewRouter())
    }
}
