package de.youmesh.quebuy.service;

import de.youmesh.quebuy.db.entity.File;
import de.youmesh.quebuy.db.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class FileService {

    private final FileRepository repository;

    public File getFileForName(String fileName) {
        File file = this.repository.findByFileName(fileName);
        if (file != null) {
            log.debug("File {{ " + fileName +  " }} was founded");
        } else {
            log.debug("File {{ " + fileName +  " }} is not stored and is now created");
            file = new File();
            file.setFileName(fileName);
        }
        return file;
    }
}
