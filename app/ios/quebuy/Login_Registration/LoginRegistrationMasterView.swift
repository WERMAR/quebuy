//
//  LoginRegistrationMasterView.swift
//  quebuy
//
//  Created by Marcel Wernisch on 24.11.21.
//

import SwiftUI

struct LoginRegistrationMasterView: View {
    @StateObject var viewRouter: ViewRouter
    
    var body: some View {
        ZStack {
            VStack{
                if viewRouter.currentPage == PageEnum.START {
                    withAnimation {
                        StartHomeView(viewRouter: self.viewRouter)
                            .transition(.opacity.animation(.easeOut))
                    }
                }
                
                if viewRouter.currentPage == PageEnum.LOGIN {
                        LoginView(viewRouter: self.viewRouter)
                        .transition(.opacity.animation(.easeOut))
                }
                
                if viewRouter.currentPage == PageEnum.REGISTER {
                    withAnimation {
                        RegistrationView(viewRouter: self.viewRouter)
                            .transition(.opacity.animation(.easeOut))
                    }
                }
            }.zIndex(-1)
        }.ignoresSafeArea()
    }
}

struct LoginRegistrationMasterView_Previews: PreviewProvider {
    static var previews: some View {
        LoginRegistrationMasterView(viewRouter: ViewRouter())
    }
}
