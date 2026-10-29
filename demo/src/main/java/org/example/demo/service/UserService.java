package org.example.demo.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.demo.dto.User;
import org.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> getUserList() {
        return userRepository.findAll();
    }

    public void addUser(User user) {
        userRepository.save(user);
    }

    public User updateUser(Long id, User user) {
        User foundUser = userRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("[USER] 존재하지 않는 회원입니다. id={}", id);
                    return new RuntimeException("존재하지 않는 회원입니다.");
                });

        foundUser.setName(user.getName());
        foundUser.setEmail(user.getEmail());

        return userRepository.save(foundUser);
    }

    public void deleteUser(Long id) {
        User foundUser = userRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("[USER] 존재하지 않는 회원입니다. id={}", id);
                    return new RuntimeException("존재하지 않는 회원입니다.");
                });

        userRepository.delete(foundUser);
    }
}
