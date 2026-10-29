package org.example.demo.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.demo.dto.User;
import org.example.demo.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;

    @Operation(summary = "회원 목록 조회", description = "모든 회원 정보 출력")
    @GetMapping("/user/list")
    public List<User> getUserList() {
        return userService.getUserList();
    }

    @Operation(summary = "회원 추가", description = "회원을 추가")
    @PostMapping("/user/add")
    public List<User> addUser(@RequestBody User user) {
        log.info("[USER] 회원 등록 요청: email={}", user.getEmail());
        userService.addUser(user);

        return userService.getUserList();
    }

    @Operation(summary = "회원 수정", description = "회원 정보를 수정")
    @PutMapping("/user/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user
    ) {
        return userService.updateUser(id, user);
    }

    @Operation(summary = "회원 삭제", description = "회원을 삭제")
    @DeleteMapping("/user/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
