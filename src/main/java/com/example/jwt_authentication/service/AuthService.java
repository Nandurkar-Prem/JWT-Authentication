package com.example.jwt_authentication.service;

import com.example.jwt_authentication.dto.RegisterRequest;
import com.example.jwt_authentication.entity.User;
import com.example.jwt_authentication.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private final PasswordEncoder passwordEncoder;


    public void register(RegisterRequest request){
        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        //Encoding the password using the Bcrypt Library
        String encodedPassword =
                passwordEncoder.encode(request.getPassword());
        user.setPassword(encodedPassword);

        user.setRole("USER");

        userRepository.save(user);
    }
}
