//
//  HistoryView.swift
//  quebuy
//
//  Created by Marcel Wernisch on 29.11.21.
//

import SwiftUI

struct HistoryView: View {
    @EnvironmentObject var cacheService: CacheService
    @State private var adverts: [Advert] = [Advert]()
    
    private let networkService = NetworkService()
    
    var body: some View {
        ZStack {
            Color.backgroundColor.ignoresSafeArea()
            VStack {
                HStack {
                    VStack(alignment: .leading) {
                        Image("logo_b")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 150)
                    }.padding(.leading, 10)
                    Spacer()
                    
                    // MARK: SettingsBtn
                    Button(action: {
                        
                    }) {
                        Image(systemName: "slider.horizontal.3")
                            .resizable()
                            .aspectRatio(contentMode: .fit)
                            .frame(width: 20)
                    }.softButtonStyle(RoundedRectangle(cornerRadius: 14), mainColor: Color.backgroundColor, darkShadowColor: Color.darkShadow, lightShadowColor: Color.lightShadow, pressedEffect: .hard)
                        .padding(.trailing, 10)
                    
                    
                }
                Spacer()
                VStack (alignment: .leading) {
                    ForEach(self.adverts, id: \Advert.id) { advert in
                        AdvertListItem(advert)
                    }
                }
                Spacer()
                Spacer()
            }
        }.onAppear {
            if let data = self.cacheService.getItem(CacheConst.ADVERT_IDS) as? [Int64] {
                NSLog("Existing Adverts: \(data.count)")
                if let authData = self.cacheService.getItem(.AUTHENTICATION) as? AuthDataStruct {
                    self.networkService.loadAdvertsForIDs(access_token: authData.access_token, advertIds: AdvertIDTO(advertIds: data)) { data in
                        NSLog("Data : \(data.count)")
                        self.adverts = data
                    }
                }
            } else {
                NSLog("No Adverts found")
                return
            }
            
        }
    }
}

struct HistoryView_Previews: PreviewProvider {
    static var previews: some View {
        HistoryView().environmentObject(CacheService())
    }
}
