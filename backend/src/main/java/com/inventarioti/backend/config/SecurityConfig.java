package com.inventarioti.backend.config;

import com.inventarioti.backend.security.jwt.JwtFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter){
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws  Exception {

        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()

                        //Administrador
                        .requestMatchers(
                                "/api/roles/**",
                                "/api/departamentos/**",
                                "/api/categorias/**"
                        ).hasRole("ADMIN")

                        //Administrador y TI
                        .requestMatchers(
                                "/api/usuarios/**",
                                "/api/equipos/**",
                                "/api/asignaciones/directa")
                        .hasAnyRole("ADMIN", "TI")

                        //Todos
                        .requestMatchers(
                                "/api/asignaciones/mis-equipos"
                        ).hasAnyRole("ADMIN", "TI", "EMPLEADO","RRHH")

                        //Administrador, TI y RRHH
                        .requestMatchers(
                                "/api/solicitudes/**")
                        .hasAnyRole("ADMIN","TI","RRHH")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults());
        return http.build();
    }
}
