//
//  RegistrationViewDetails.swift
//  quebuy
//
//  Created by Marcel Wernisch on 24.11.21.
//

import SwiftUI

struct RegistrationViewDetails: View {
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
    
    @State private var firstname: String = ""
    @State private var lastname: String = ""
    @State private var mail: String = ""
    
    var body: some View {
        ZStack {
            Color.backgroundColor
                .ignoresSafeArea()
            VStack {
                
                Image("logo_b")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 250)
                Spacer(minLength: 100)
                Group {
                    VStack(spacing:25) {
                        // MARK: INPUTFIELDS
                        HStack{
                            Image(systemName: "person.fill")
                            TextFieldPlaceholder(
                                placeholder: Text("Vorname"),
                                text: $firstname)
                        } .padding()
                            .frame(width: 350)
                            .foregroundColor(Color.grey)
                            .background(
                                RoundedRectangle(cornerRadius: 30).fill(Color.backgroundColor)
                                    .softInnerShadow(RoundedRectangle(cornerRadius: 30), darkShadow: .darkShadow, lightShadow: .lightShadow, spread: 0.05, radius: 2)
                                    .cornerRadius(50))
                        
                        HStack {
                            Image(systemName: "person.fill")
                            SecureFieldCustom(
                                placeholder: Text("Nachname"),
                                text: $lastname)
                            
                        }.padding()
                            .frame(width: 350)
                            .foregroundColor(Color.grey)
                            .background(
                                RoundedRectangle(cornerRadius: 30).fill(Color.backgroundColor)
                                    .softInnerShadow(RoundedRectangle(cornerRadius: 30), darkShadow: .darkShadow, lightShadow: .lightShadow, spread: 0.05, radius: 2)
                                    .cornerRadius(50))
                        
                        HStack {
                            Image(systemName: "envelope.fill")
                            SecureFieldCustom(
                                placeholder: Text("E-Mail Adresse"),
                                text: $mail)
                        }.padding()
                            .frame(width: 350)
                            .foregroundColor(Color.grey)
                            .background(
                                RoundedRectangle(cornerRadius: 30).fill(Color.backgroundColor)
                                    .softInnerShadow(RoundedRectangle(cornerRadius: 30), darkShadow: .darkShadow, lightShadow: .lightShadow, spread: 0.05, radius: 2)
                                    .cornerRadius(50))
                    }
                    Spacer(minLength: 100)
                }
                // MARK: FORWARDBTN
                Button(action: {
                    
                }){
                    Text("Registrieren")
                        .frame(width: 250, alignment: .center)
                        .font(Font.body.bold())
                        .foregroundColor(Color.grey)
                        .cornerRadius(50)
                    
                }.softButtonStyle(RoundedRectangle(cornerRadius: 50), mainColor: Color.backgroundColor, darkShadowColor: Color.darkShadow, lightShadowColor: Color.lightShadow, pressedEffect: .hard)
                HStack{
                    Text("Bereits registriert?")
                        .foregroundColor(Color.grey)
                    Button(action: {
                        
                    }) {
                        Text("Jetzt anmelden")
                            .foregroundColor(Color.primaryGreen)
                    }
                }.padding(.bottom, 30)
            }
        }.navigationBarBackButtonHidden(true)
            .navigationBarItems(leading: btnBack)
    }
    
    
    // MARK: Custom BackButton
    var btnBack : some View { Button(action: {
        self.presentationMode.wrappedValue.dismiss()
    }) {
        HStack {
            Image(systemName: "chevron.backward") // set image here
                .aspectRatio(contentMode: .fit)
                .foregroundColor(Color.primaryGreen)
            Text("Zurück").foregroundColor(Color.primaryGreen)
        }
    }
    }
}

struct RegistrationViewDetails_Previews: PreviewProvider {
    static var previews: some View {
        RegistrationViewDetails()
    }
}
