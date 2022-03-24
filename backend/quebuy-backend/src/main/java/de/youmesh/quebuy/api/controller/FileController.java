package de.youmesh.quebuy.api.controller;

import de.youmesh.quebuy.api.data.MessageRestData;
import de.youmesh.quebuy.api.data.UploadFileResponse;
import de.youmesh.quebuy.exceptions.FileStorageException;
import de.youmesh.quebuy.service.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/internal/files")
@RequiredArgsConstructor
@Slf4j
public class FileController {

    private final FileStorageService fileStorageService;

    @PostMapping("/upload")
    @ResponseBody
    public UploadFileResponse upload(@RequestBody MultipartFile file) {
        log.info("File Upload active - File-Size: " + file.getSize() + " Bytes");
        try {
            String fileName = this.fileStorageService.storeFile(file);
            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
                    .path(fileName)
                    .toUriString();
            return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
        } catch (FileStorageException e) {
            log.error("Error while trying to store File", e);
            throw new RuntimeException();
        }
    }

    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestBody MultipartFile[] files) {
        return Arrays.stream(files)
                .map(this::upload)
                .collect(Collectors.toList());
    }

    @GetMapping("/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        try {
            Resource resource = fileStorageService.loadFileAsResource(fileName);
            String contentType = null;
            try {
                contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
            } catch (IOException ex) {
                log.error("Could not determine file type", ex);
            }
            if (contentType == null) {
                contentType = "application/octet-stream";
            }
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (Exception e) {
            log.error("Error while trying to download a file - Check stacktrace ", e);
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @DeleteMapping("/{fileName:.+}")
    public ResponseEntity<MessageRestData> deleteFile(@PathVariable String fileName) {
        try {
            boolean removedFile = fileStorageService.removeFile(fileName);
            MessageRestData messageRestData = new MessageRestData(removedFile ? "SUCCESS" : "ERROR - FILE");
            return removedFile ? ResponseEntity.ok(messageRestData) : ResponseEntity.internalServerError().body(messageRestData);
        } catch (Exception e) {
            MessageRestData messageRestData = new MessageRestData("ERROR - File not deleted");
            log.error("Error while trying to download a file - Check stacktrace ", e);
            return ResponseEntity.internalServerError().body(messageRestData);
        }
    }
}
