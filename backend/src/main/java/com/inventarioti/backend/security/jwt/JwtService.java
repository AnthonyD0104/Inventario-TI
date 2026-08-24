package com.inventarioti.backend.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import com.inventarioti.backend.entity.Usuario;
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

// Servicio: generación y validación de JWT
@Service
public class JwtService {

    //llave secreta para firmar el token
    private static final String SECRET_KEY =
            "inventarioTIProyecto2026SpringBootReactJWT123456789";

    //Duracion del token (24 horas)
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    private Key getSigningKey() {

        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    // Genera el JWT con username y rol
    public String generarToken(Usuario usuario) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("rol", usuario.getRol().getNombre());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(usuario.getUsuario())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    // Extrae el username del token
    public String extraerUsuario(String token){
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
    // Extrae el rol del token
    public String extraerRol(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(getSigningKey())
                .parseClaimsJws(token)
                .getBody();
        return claims.get("rol", String.class);
    }
    // Valida que el token pertenezca al usuario
    public boolean validarToken(String token, String usuario) {

        return extraerUsuario(token).equals(usuario);
    }
}
