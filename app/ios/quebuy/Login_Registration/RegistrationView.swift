//
//  RegistrationView.swift
//  quebuy
//
//  Created by Marcel Wernisch on 24.11.21.
//

import SwiftUI
import Neumorphic

struct RegistrationView: View {
    
    @StateObject var viewRouter: ViewRouter
    
    @State private var username: String = ""
    @State private var password: String = ""
    @State private var confirmPassword: String = ""
    @State private var goForward: Bool = false;
    
    var body: some View {
        NavigationView {
            ZStack {
                Color.backgroundColor
                    .ignoresSafeArea()
                VStack(){
                    Spacer(minLength: 100)
                    Image("logo_b")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 250)
                    Spacer(minLength: 75)
                    Group {
                        Text("Hi!")
                            .foregroundColor(Color.primaryGreen)
                            .font(.title)
                        Text("Erstelle einen Account")
                            .foregroundColor(Color.grey)
                        Spacer()
                    }
                    Group {
                        VStack(spacing:25) {
                            // MARK: INPUTFIELDS
                            HStack{
                                Image(systemName: "person.fill")
                                TextFieldPlaceholder(
                                    placeholder: Text("Username"),
                                    text: $username)
                            } .padding()
                                .frame(width: 350)
                                .foregroundColor(Color.grey)
                                .background(
                                    RoundedRectangle(cornerRadius: 30).fill(Color.backgroundColor)
                                        .softInnerShadow(RoundedRectangle(cornerRadius: 30), darkShadow: .darkShadow, lightShadow: .lightShadow, spread: 0.05, radius: 2)
                                        .cornerRadius(50))
                            
                            HStack {
                                Image(systemName: "lock.fill")
                                SecureFieldCustom(
                                    placeholder: Text("Password"),
                                    text: $password)
                                
                            }.padding()
                                .frame(width: 350)
                                .foregroundColor(Color.grey)
                                .background(
                                    RoundedRectangle(cornerRadius: 30).fill(Color.backgroundColor)
                                        .softInnerShadow(RoundedRectangle(cornerRadius: 30), darkShadow: .darkShadow, lightShadow: .lightShadow, spread: 0.05, radius: 2)
                                        .cornerRadius(50))
                            
                            HStack {
                                Image(systemName: "lock.fill")
                                SecureFieldCustom(
                                    placeholder: Text("Password bestätigen"),
                                    text: $confirmPassword)
                            }.padding()
                                .frame(width: 350)
                                .foregroundColor(Color.grey)
                                .background(
                                    RoundedRectangle(cornerRadius: 30).fill(Color.backgroundColor)
                                        .softInnerShadow(RoundedRectangle(cornerRadius: 30), darkShadow: .darkShadow, lightShadow: .lightShadow, spread: 0.05, radius: 2)
                                        .cornerRadius(50))
                        }
                        Spacer(minLength: 150)
                    }
                    // MARK: FORWARDBTN
                    Button(action: {
                        self.goForward = true
                    }){
                        Text("Weiter")
                            .frame(width: 250, alignment: .center)
                            .font(Font.body.bold())
                            .foregroundColor(Color.grey)
                            .cornerRadius(50)
                        
                    }.softButtonStyle(RoundedRectangle(cornerRadius: 50), mainColor: Color.backgroundColor, darkShadowColor: Color.darkShadow, lightShadowColor: Color.lightShadow, pressedEffect: .hard)
                    HStack{
                        Text("Bereits registriert?")
                            .foregroundColor(Color.grey)
                        Button(action: {
                            viewRouter.currentPage = PageEnum.LOGIN
                        }) {
                            Text("Jetzt anmelden")
                                .foregroundColor(Color.primaryGreen)
                        }
                        NavigationLink("", destination: RegistrationViewDetails(), isActive: $goForward)
                    }
                    Spacer(minLength: 65)
                }
            }
            .navigationBarHidden(true)
            .navigationBarTitle(Text("Registration"))
            .edgesIgnoringSafeArea([.top, .bottom])
        }
    }
}

struct RegistrationView_Previews: PreviewProvider {
    static var previews: some View {
        RegistrationView(viewRouter: ViewRouter())
    }
}
