package org.example.demo.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;
    @NotNull
    @Email
    private String email;

    @Transient
    @NotNull(message = "약관 동의 여부는 필수입니다.")
    @AssertTrue(message = "이용 약관에 동의하세요")
    private Boolean agreed;

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }
}
