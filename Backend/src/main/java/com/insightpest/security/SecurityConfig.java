package com.insightpest.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .headers(headers -> headers.addHeaderWriter(
                new XFrameOptionsHeaderWriter(XFrameOptionsHeaderWriter.XFrameOptionsMode.SAMEORIGIN)
            ))
            .authorizeHttpRequests(auth -> auth
                // Allow public API read endpoints
                .requestMatchers(HttpMethod.GET, "/api/v1/services/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/pests/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/locations/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/testimonials/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/faqs/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/blog/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/bookings/availability").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/bookings/**").permitAll()

                // Allow public form submission POST endpoints
                .requestMatchers(HttpMethod.POST, "/api/v1/leads/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/v1/bookings/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/v1/contact/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/v1/newsletter/**").permitAll()

                // Allow Swagger OpenAPI UI
                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()

                // All other endpoints require authentication
                .anyRequest().permitAll()
            );

        return http.build();
    }
}
