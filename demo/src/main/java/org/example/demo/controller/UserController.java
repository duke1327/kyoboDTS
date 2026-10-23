package org.example.demo.controller;

import lombok.RequiredArgsConstructor;
import org.example.demo.dto.User;
import org.example.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;

    @GetMapping("/user/list")
    public List<User> getUserList() {
        return userService.getUserList();
    }

    @PostMapping("/user/add")
    public List<User> addUser(@RequestBody User user) {
        userService.addUser(user);

        return userService.getUserList();
    }

    @PutMapping("/user/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user
    ) {
        return userService.updateUser(id, user);
    }
}
