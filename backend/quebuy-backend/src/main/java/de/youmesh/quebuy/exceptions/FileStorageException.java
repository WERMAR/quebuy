package de.youmesh.quebuy.exceptions;

public class FileStorageException extends Exception {

    public FileStorageException(String message, Exception ex) {
        super(message, ex);
    }
}
