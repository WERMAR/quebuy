//
//  LoginView.swift
//  quebuy
//
//  Created by Marcel Wernisch on 24.11.21.
//

import SwiftUI
import Neumorphic

struct LoginView: View {
    
    @EnvironmentObject var cacheService: CacheService
    
    @StateObject var viewRouter: ViewRouter
    @State private var username: String = ""
    @State private var password: String = ""
    
    private let networkService = NetworkService()
    
    var body: some View {
        NavigationView {
            ZStack {
                Color.backgroundColor
                    .ignoresSafeArea()
                VStack {
                    Spacer(minLength: 100)
                    Image("logo_b")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 250)
                    Spacer(minLength: 75)
                    Group {
                        Text("Willkommen zurück!")
                            .font(.title)
                            .foregroundColor(Color.primaryGreen)
                        Text("Melde dich an um fortzufahren")
                            .font(.headline)
                            .foregroundColor(Color.grey)
                        Spacer()
                        
                    }
                    Group {
                        VStack(spacing:25) {
                            // MARK: INPUTFIELDS
                            HStack {
                                Image(systemName: "person.fill")
                                TextFieldPlaceholder(placeholder: Text("Username/ E-Mail"), text: $username)
                                
                            }.padding()
                                .frame(width: 350)
                                .foregroundColor(Color.grey)
                                .background(
                                    RoundedRectangle(cornerRadius: 30).fill(Color.backgroundColor)
                                        .softInnerShadow(RoundedRectangle(cornerRadius: 30), darkShadow: .darkShadow, lightShadow: .lightShadow, spread: 0.05, radius: 2)
                                        .cornerRadius(50))
                            
                            
                            HStack {
                                Image(systemName: "lock.fill")
                                SecureFieldCustom(placeholder: Text("Password"), text: $password)
                            }.padding()
                                .frame(width: 350)
                                .foregroundColor(Color.grey)
                                .background(
                                    RoundedRectangle(cornerRadius: 30).fill(Color.backgroundColor)
                                        .softInnerShadow(RoundedRectangle(cornerRadius: 30), darkShadow: .darkShadow, lightShadow: .lightShadow, spread: 0.05, radius: 2)
                                        .cornerRadius(50))
                            
                        }
                        Button(action: {
                            
                        }) {
                            Text("Passwort vergessen?").foregroundColor(Color.primaryGreen)
                        }.padding(.top, 10)
                    }
                    
                    Spacer()
                    // MARK: LOGINBTN
                    Button(action: {
                        print("Username \(self.username) / Password: \(self.password)")
                        
                        networkService.doLogin(username: self.username, password: self.password) { result in
                            guard let dataResult = result else {
                                print("ERROR")
                                return
                            }
                            self.cacheService.addItem(CacheConst.AUTHENTICATION, dataResult)
                            self.cacheService.print()
                            viewRouter.currentPage = .MAP
                        }
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
            .navigationBarHidden(true)
            .navigationBarTitle(Text("Login"))
            .edgesIgnoringSafeArea([.top, .bottom])
        }
    }
    
}

struct LoginView_Previews: PreviewProvider {
    static var previews: some View {
        LoginView(viewRouter: ViewRouter()).environmentObject(CacheService())
    }
}
