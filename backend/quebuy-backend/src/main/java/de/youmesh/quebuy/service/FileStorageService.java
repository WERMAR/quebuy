package de.youmesh.quebuy.service;


import de.youmesh.quebuy.conf.properties.FileStorageProperties;
import de.youmesh.quebuy.exceptions.FileStorageException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    /**
     * Instantiates a new File storage service.
     *
     * @param fileStorageProperties the file storage properties
     * @throws FileStorageException - when the configured path can not create by the system.
     */
    public FileStorageService(FileStorageProperties fileStorageProperties) throws FileStorageException {
        this.fileStorageLocation = Paths.get(fileStorageProperties.getUploadDir()).toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored", ex);
        }
    }

    /**
     * returns the stored filename. Stores uploaded file to configured path (see <strong>application.properties</strong>)
     *
     * @param file the uploaded file
     * @return the file name
     * @throws FileStorageException - when a IOException will throw while try to store the file.
     */
    public String storeFile(MultipartFile file) throws FileStorageException {
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

        try {
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException ioe) {
            throw new FileStorageException("Could not store file " + fileName + ". Please check stacktrace", ioe);
        }
    }

    /**
     * returns a file as a {@link Resource}. Load a file from the disk as a {@link Resource}-Object
     *
     * @param fileName the name of the searched file
     * @return the loaded file as a {@link Resource}
     * @throws FileNotFoundException - when the file is not found
     * @throws Exception             - when a {@link MalformedURLException} was thrown
     */
    public Resource loadFileAsResource(String fileName) throws Exception {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new Exception("File not found " + fileName, ex);
        }
    }

    public boolean removeFile(String fileName) throws Exception {
        Resource resource = this.loadFileAsResource(fileName);
        return resource.getFile().delete();
    }
}
