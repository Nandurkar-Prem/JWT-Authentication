package com.example.jwt_authentication.service;

import com.example.jwt_authentication.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class CustomUserDetailsService implements UserDetailsService {
    //This is a very important class to understand because Spring Security needs data in it's
    //Own format this class asks Spring Security for a username and it goes to DB and find that user
    //and convert the user into the format Spring Security understands and then return the data to
    //Spring Security. That is exactly what CustomUserDetailsService does.

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.example.jwt_authentication.entity.User user =
                userRepository.findByUsername(username)
                        .orElseThrow(() -> new UsernameNotFoundException(
                                "User not found: " + username
                        ));

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();
    }
}
