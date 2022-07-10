//
//  MapView.swift
//  quebuy
//
//  Created by Marcel Wernisch on 26.11.21.
//

import SwiftUI
import MapKit

struct MapView: View, MapDelegate {
    
    @EnvironmentObject var cacheService: CacheService
    
    @StateObject private var viewModel = MapViewModel()
    @State private var annotationItems = [POIAnnotationItem]()
    var networkService = NetworkService()
    
    @State private var updatedRegion: MKCoordinateRegion? = nil
    
    var body: some View {
        ZStack {
            Map(coordinateRegion: $viewModel.region, showsUserLocation: true,
                annotationItems: annotationItems) { item in
                MapAnnotation(coordinate: item.coordinate) {
                    Image("spx_icon_weiß")
                            .resizable()
                            .frame(width: 40, height: 60)
                            .onTapGesture {
                                NSLog("Annotation was clicked")
                            }
                }
            }
                .accentColor(Color.primaryGreen)
                    .edgesIgnoringSafeArea(.top)
        }.onAppear {
            viewModel.checkIfLocationServicesIsEnabled()
            viewModel.startUpdatingPosition(self)
        }
        .onDisappear {
            self.viewModel.stopUpdatingPosition()
        }
    }
    
    private func addPinsToMap(_ data: [POI]) {
        Swift.print("Length of data: \(data.count)")
        self.annotationItems = []
        var adverts = [Int64]()
        for poi in data {
            let pin = POIAnnotationItem(coordinate: CLLocationCoordinate2D(latitude: poi.longitude, longitude: poi.latitude))
            self.annotationItems.append(pin)
            if (adverts.count > 0) {
                if adverts.firstIndex(of: poi.adverts[0]) == nil {
                    adverts.append(poi.adverts[0])
                }
            } else {
                adverts.append(poi.adverts[0])
            }
        }
        NSLog("Number of founded Advert-IDs: \(adverts.count)")
        self.cacheService.addItem(CacheConst.ADVERT_IDS, adverts)
    }
    
    func regionDidChanged(_ region: MKCoordinateRegion) {
        self.updatedRegion = region
        self.loadPOIForMap()
    }
    
    func loadPOIForMap() {
        guard let authData = self.cacheService.getItem(.AUTHENTICATION) as? AuthDataStruct else {
            print("ERROR: no data found in cache")
            return
        }
        let currentLocation = (long: self.updatedRegion!.center.longitude, lat: self.updatedRegion!.center.latitude)
        networkService.loadingPOI(access_token: authData.access_token, currentLocation: currentLocation) { data in
            self.addPinsToMap(data)
        }
    }
}

struct POIAnnotationItem: Identifiable {
    let id = UUID()
    var coordinate: CLLocationCoordinate2D
}

struct MapView_Previews: PreviewProvider {
    static var previews: some View {
        MapView().environmentObject(CacheService())
    }
}
