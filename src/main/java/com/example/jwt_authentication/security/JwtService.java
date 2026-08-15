package com.example.jwt_authentication.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;


@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(String username){
        SecretKey key = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())//This method records the time when JWT is created
                .expiration(new Date(System.currentTimeMillis() + expiration))//Here we are setting the expiration time
                .signWith(key)//This method signs the token using our secret key.
                .compact();//This method converts everything into a familiar JWT Token {HEADER.PAYLOAD.SIGNATURE}
    }
}
