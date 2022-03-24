package de.youmesh.quebuy.api.data;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserRestData {
    @JsonProperty("username")
    private String username;

    @JsonProperty("password")
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "[" +
                "username:" + username + '\'' +
                ", password:" + password + '\'' +
                ']';
    }
}
