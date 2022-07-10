//
//  TextFieldPlaceholder.swift
//  quebuy
//
//  Created by Marcel Wernisch on 24.11.21.
//

import SwiftUI

struct TextFieldPlaceholder: View {
    var placeholder: Text
    @Binding var text: String
    var editingChanged: (Bool)->() = { _ in }
    var commit: ()->() = { }
    
    var body: some View {
        ZStack(alignment: .leading) {
            if text.isEmpty { placeholder }
                TextField("", text: $text, onEditingChanged: editingChanged, onCommit: commit)
        }
    }
}
