//
//  ImageDownloader.swift
//  quebuy
//
//  Created by Marcel Wernisch on 04.04.22.
//

import Foundation

protocol ImageDownloader {
    var cacheKey: String {get}
    func downloadImageData(access_token: String,completion: @escaping (Data?) -> Void)
}

class DefaultImageDownloader: ImageDownloader {
    let imagePath: String

    init(imagePath: String) {
        self.imagePath = imagePath
        
    }
    
    var cacheKey: String {
        self.imagePath
    }
    
    func downloadImageData(access_token: String, completion: @escaping (Data?) -> Void) {
        NSLog("Current imagePath: \(self.imagePath)")
        guard let url = URL(string: "http://localhost:8080/internal/files/downloadFile/\(self.imagePath)") else {return}
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer \(access_token)", forHTTPHeaderField: "Authorization")
        request.httpMethod = "GET"
        
        let dataTask = URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let data = data {
                completion(data)
            }
        }
        dataTask.resume()
    }
}

