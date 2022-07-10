//
//  SecureFieldCustom.swift
//  quebuy
//
//  Created by Marcel Wernisch on 24.11.21.
//

import SwiftUI

struct SecureFieldCustom: View {
    var placeholder: Text
    @Binding var text: String
    var body: some View {
        ZStack(alignment: .leading) {
            if text.isEmpty { placeholder }
                SecureField("", text: $text)
        }
    }
}
