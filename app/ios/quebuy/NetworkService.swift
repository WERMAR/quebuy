//
//  NetworkService.swift
//  quebuy
//
//  Created by Marcel Wernisch on 07.04.22.
//

import Foundation
import os.log

class NetworkService: ObservableObject {
    
    private var currentAddress = "localhost"
    
    func doLogin(username: String, password: String, completion: @escaping (AuthDataStruct?) -> ()) {
        var request = URLRequest(url: URL(string: "http://\(currentAddress):8080/login")!)
        request.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "POST"
        request.httpBody = self.createFormDataBody(username: username, password: password)
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data,
                  let response = response as? HTTPURLResponse,
                  error == nil else {
                      print("error", error ?? "Unkonwn error")
                      return
                  }
            
            guard (200...299) ~= response.statusCode else {
                print("statusCode should be 2xx, but is \(response.statusCode)")
                print("response = \(response)")
                return
            }
            
            var result: AuthDataStruct? = nil
            do {
                try result = JSONDecoder().decode(AuthDataStruct.self, from: data)
            } catch {
                // no interaction is needed when Decoding failed
            }
            DispatchQueue.main.async {
                completion(result)
            }
        }
        task.resume()
    }
    
    func createFormDataBody(username: String, password: String) -> Data {
        let data : Data = "username=\(username)&password=\(password)".data(using: .utf8)!
        return data
    }
    
    
    func loadingPOI(access_token: String, currentLocation: (long: Double, lat: Double), completionHandler: @escaping ([POI]) -> ()) {
        var request = URLRequest(url: URL(string: "http://\(currentAddress):8080/internal/poi/currentLocation")!)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer \(access_token)", forHTTPHeaderField: "Authorization")
        request.httpMethod = "POST"
        request.httpBody = try! JSONEncoder().encode(self.createLoadingPOIBody(currentLocation))
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data,
                  let response = response as? HTTPURLResponse,
                  error == nil else {
                      print("error", error ?? "Unkonwn error")
                      return
                  }
            
            guard (200...299) ~= response.statusCode else {
                print("statusCode should be 2xx, but is \(response.statusCode)")
                print("response = \(response)")
                return
            }
            
            var result: [POI]? = nil
            do {
                try result = JSONDecoder().decode([POI].self, from: data)
            } catch {
                // no interaction is needed when Decoding failed
            }
            DispatchQueue.main.async {
                completionHandler(result ?? [])
            }
        }
        task.resume()
    }
    
    func loadAdvertsForIDs(access_token: String, advertIds: AdvertIDTO, completionHandler: @escaping ([Advert]) -> ()) {
        var request = URLRequest(url: URL(string: "http://\(currentAddress):8080/internal/advert/forIds")!)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("Bearer \(access_token)", forHTTPHeaderField: "Authorization")
        request.httpMethod = "POST"
        
        request.httpBody = try! JSONEncoder().encode(advertIds)
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data,
                  let response = response as? HTTPURLResponse,
                  error == nil else {
                      print("error", error ?? "Unkonwn error")
                      return
                  }
            
            guard (200...299) ~= response.statusCode else {
                print("statusCode should be 2xx, but is \(response.statusCode)")
                print("response = \(response)")
                return
            }
            
            var result: [Advert]? = nil
            do {
                try result = JSONDecoder().decode([Advert].self, from: data)
            } catch {
                NSLog("JSON can not decoded")
                // no interaction is needed when Decoding failed
            }
            DispatchQueue.main.async {
                completionHandler(result ?? [])
            }
        }
        task.resume()
    
    }
    
    func createLoadingPOIBody(_ currentLocation: (long: Double, lat: Double)) -> POIRequest {
       return POIRequest(longitude: currentLocation.long, latitude: currentLocation.lat, ratio: 1000)
    }
}

