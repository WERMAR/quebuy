//
//  ContentView.swift
//  quebuy
//
//  Created by Marcel Wernisch on 23.11.21.
//

import SwiftUI
import Neumorphic

struct StartHomeView: View {
    @StateObject var viewRouter: ViewRouter
    
    var body: some View {
        ZStack {
            Color.backgroundColor.ignoresSafeArea()
            VStack {
                Spacer()
                Image("logo_b")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 250)
                Spacer()
                Spacer()
                Group {
                    Text("Hallo!")
                        .font(.title)
                        .foregroundColor(Color.primaryGreen)
                    Text("Be smart use quebuy")
                        .foregroundColor(Color.grey)
                    Text("Erhalte Rabatte deiner Lieblingsgeschäfte in deiner Stadt")
                        .foregroundColor(Color.grey)
                        .frame(width: 190)
                        .multilineTextAlignment(.center)
                        .padding(.top)
                }
                Image("cart")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 150)
                Button(action: {
                    viewRouter.currentPage = PageEnum.LOGIN
                }){
                    Text("Login")
                        .frame(width: 250, alignment: .center)
                        .font(Font.body.bold())
                        .foregroundColor(Color.grey)
                        .cornerRadius(50)
                    
                }
                .softButtonStyle(RoundedRectangle(cornerRadius: 50), mainColor: Color.backgroundColor, darkShadowColor: Color.darkShadow, lightShadowColor: Color.lightShadow, pressedEffect: .hard)
                HStack{
                    Text("Kein Account?")
                        .foregroundColor(Color.grey)
                    Button(action: {
                        viewRouter.currentPage = PageEnum.REGISTER
                    }) {
                        Text("Jetzt registrieren")
                            .foregroundColor(Color.primaryGreen)
                    }
                }
                Spacer()
            }
        }
        
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        StartHomeView(viewRouter: ViewRouter())
    }
}
