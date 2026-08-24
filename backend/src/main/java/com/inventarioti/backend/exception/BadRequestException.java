package com.inventarioti.backend.exception;

// Excepción: petición inválida (400)
public class BadRequestException extends RuntimeException{

    public BadRequestException(String mensaje){
        super(mensaje);
    }
}
