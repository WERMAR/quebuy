//
//  AdvertListItem.swift
//  quebuy
//
//  Created by Marcel Wernisch on 09.01.22.
//

import SwiftUI

struct AdvertListItem: View {
  
    let advertData: Advert
    
    init(_ advertData: Advert) {
        self.advertData = advertData
    }
    
    var body: some View {
        HStack(spacing: 50) {
            RemoteImage(placeholderImage: Image(systemName: "photo"), imageDownloader: DefaultImageDownloader(imagePath: advertData.organizationDetails.logoName))
                .padding(.leading, 15)
            VStack (alignment:.leading, spacing: 10){
                Text(String("\(self.advertData.organizationDetails.organizationName)"))
                    .foregroundColor(Color.headerGrey)
                    .font(.system(size: 20))
                    .fontWeight(.bold)
                Text(String("\(self.advertData.shortDescription)"))
                    .foregroundColor(Color.darkerGrey)
                    .lineLimit(2)
                    .frame(width: 100, alignment: .leading)
            }
            TimerButton()
                .padding(.trailing, 15)
        }
        Divider()
    }
}

struct AdvertListItem_Previews: PreviewProvider {
    static var previews: some View {
        AdvertListItem(Advert(id: 1, shortDescription: "test", longDescription: "test", location: Location(streetName: "Test", postcode: "Test", village: "Test", countryName: "DE"), organizationDetails: OrganizationDetails(organizationName: "Test", telephoneNumber: "0123456789", mail: "test@test.de", logoName: "apple_logo", openingHours: [])))
    }
}
