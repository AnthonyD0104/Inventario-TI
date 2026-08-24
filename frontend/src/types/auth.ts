// Type: credenciales de inicio de sesión
export interface LoginRequest {
    usuario: string;
    password: string;
}

// Type: respuesta de login con JWT y datos del usuario
export interface LoginResponse {
    token: string;
    nombres: string;
    apellidos: string;
    rol: string;
    usuario: string;
}
