package com.example.jwt_authentication.service;

import com.example.jwt_authentication.dto.LoginRequest;
import com.example.jwt_authentication.dto.LoginResponse;
import com.example.jwt_authentication.dto.RegisterRequest;
import com.example.jwt_authentication.entity.RefreshToken;
import com.example.jwt_authentication.entity.User;
import com.example.jwt_authentication.repository.UserRepository;
import com.example.jwt_authentication.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtService jwtService, RefreshTokenService refreshTokenService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
    }

    public void register(RegisterRequest request){
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

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

    public LoginResponse login(LoginRequest request) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword()
                        )
                );

        User user = userRepository.findByUsername(
                authentication.getName()
        ).orElseThrow(() ->
                new RuntimeException("User not found")
        );

        String accessToken =
                jwtService.generateToken(authentication.getName());

        RefreshToken refreshToken =
                refreshTokenService.createRefreshToken(user);

        return new LoginResponse(
                accessToken,
                refreshToken.getToken()
        );
    }

    public LoginResponse refreshAccessToken(String token) {
        RefreshToken refreshToken =
                refreshTokenService.findByToken(token);
        refreshTokenService.verifyExpiration(refreshToken);
        User user = refreshToken.getUser();
        String accessToken =
                jwtService.generateToken(user.getUsername());
        refreshTokenService.deleteByToken(token);
        RefreshToken newRefreshToken =
                refreshTokenService.createRefreshToken(user);
        return new LoginResponse(
                accessToken,
                newRefreshToken.getToken()
        );
    }

    public void logout(String refreshToken) {
        refreshTokenService.deleteByToken(refreshToken);
    }
}
