package com.example.jwt_authentication.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {//This is a first step for any project in Spring Boot to map the entities first
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Here {nullable = false} means in the DB column the field email should not contain null
    //also {unique = true} means no 2 rows have the same value for this email field.
    //Basically email of every person should be unique.
    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    //Here we are only using {nullable = false} because we want the field not to be empty
    //But the password of 2 or more people can be same and the reason we are not using {unique = true}
    //because when we hash the password the hash of same password can be different.
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;
}
