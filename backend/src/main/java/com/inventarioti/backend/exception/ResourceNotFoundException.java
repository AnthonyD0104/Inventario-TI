package com.inventarioti.backend.exception;

// Excepción: recurso no encontrado (404)
public class ResourceNotFoundException extends RuntimeException{

    public ResourceNotFoundException(String mensaje) {
        super(mensaje);
    }
}
