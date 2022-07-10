//
//  TimerButton.swift
//  quebuy
//
//  Created by Marcel Wernisch on 21.01.22.
//

import SwiftUI

struct TimerButton: View {
    
    @State var fill: CGFloat
    @State var colorOfCircle: Color
    @State var displayIcon: Bool = false
    
    init () {
        let hour = Calendar.current.component(.hour, from: Date())
        let fillVal = (CGFloat(hour) * 1.0 / 24.0)
        self.fill = fillVal
        self.colorOfCircle = TimerButton.getColorOfCircle(fillVal: fillVal)
    }
    
    var body: some View {
        ZStack {
            ZStack {
                // Track circle
                Circle()
                    .stroke(Color.grey.opacity(0.3), style: StrokeStyle(lineWidth:20))
                    .frame(width: 55, height: 55)
                
                // Animation circle
                Circle()
                    .trim(from: 0, to: self.fill)
                    .stroke(self.colorOfCircle, style: StrokeStyle(lineWidth: 20))
                    .rotationEffect(.init(degrees: -90))
                    .animation(.default)
                    .frame(width: 55, height: 55)
            }
            Button(action: {
                self.fill = 1.0
                displayIcon.toggle()
            }) {
                if displayIcon {
                    Image(systemName: "checkmark.circle")
                } else {
                    Text("")
                        .frame(width: 15, height: 15)
                        .foregroundColor(.transparent)
                }
            }
            .softButtonStyle(Circle(),
                             mainColor: Color.white, textColor: Color.primaryGreen, darkShadowColor: Color.transparent, lightShadowColor:Color.transparent)
        }
    }
    
    private static func getColorOfCircle(fillVal: CGFloat) -> Color {
        if (fillVal < 0.25) {
            return Color.primaryGreen
        } else if (fillVal >= 0.25 && fillVal < 0.5) {
            return Color.purple
        } else if (fillVal >= 0.5 && fillVal < 0.75) {
            return Color.pink
        } else if (fillVal >= 0.75 && fillVal < 1.0) {
            return Color.mangenta
        } else {
            return Color.transparent
        }
    }
}

struct TimerButton_Previews: PreviewProvider {
    static var previews: some View {
        TimerButton()
    }
}
 
