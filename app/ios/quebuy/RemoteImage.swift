//
//  RemoteImage.swift
//  quebuy
//
//  Created by Marcel Wernisch on 09.01.22.
//

import SwiftUI

struct RemoteImage: View {
    
    @EnvironmentObject var cacheService: CacheService
    @EnvironmentObject var remoteImageCache: RemoteImageCache
    @State var uiImage: UIImage?
    
    let placeholderImage: Image
    let imageDownloader: ImageDownloader
    
    init(placeholderImage: Image, imageDownloader: ImageDownloader) {
        self.placeholderImage = placeholderImage
        self.imageDownloader = imageDownloader
    }
    
    var body: some View {
        if let uiImage = self.uiImage {
            Image(uiImage: uiImage)
                .resizable()
                .scaledToFit()
                .frame(maxWidth: 85, maxHeight: 70)
                .background(Color.white)
                .clipShape(RoundedRectangle(cornerRadius: 10))
        } else {
            placeholderImage
                .resizable()
                .frame(width: 60, height: 60)
                .clipShape(Circle())
                .onAppear(perform: getImage)
        }
    }
    
    private func getImage() {
        let cacheKey = self.imageDownloader.cacheKey
        if let authData = self.cacheService.getItem(.AUTHENTICATION) as? AuthDataStruct {
            if let cachedImage = self.remoteImageCache.getImage(for: cacheKey) {
                print("Used cache")
                self.uiImage = cachedImage
            } else {
                self.imageDownloader.downloadImageData(access_token: authData.access_token) { imageData in
                    guard
                        let imageData = imageData,
                        let uiImage = UIImage(data: imageData) else {
                            self.uiImage = nil
                            return
                        }
                    
                    self.remoteImageCache.cache(uiImage, for: cacheKey)
                    
                    DispatchQueue.main.async {
                        self.uiImage = uiImage
                    }
                }
            }
        }
    }
}
