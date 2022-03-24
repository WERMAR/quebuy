package de.youmesh.quebuy.service;

import de.youmesh.quebuy.db.entity.User;
import de.youmesh.quebuy.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    public User getUserForId(BigInteger id) {
        Optional<User> searchedUser = this.userRepository.findById(id);
        if (searchedUser.isEmpty()) {
            log.warn(String.format("System can not find any User with ID: %d", id));
        }
        return searchedUser.orElse(null);
    }
}
