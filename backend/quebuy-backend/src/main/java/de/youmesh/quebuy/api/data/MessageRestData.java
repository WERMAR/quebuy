package de.youmesh.quebuy.api.data;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain = true)
public class MessageRestData {

    private String message;

    public MessageRestData() {
        this.message = null;
    }

    public MessageRestData(String message) {
        this.message = message;
    }
}
