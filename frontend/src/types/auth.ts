export interface LoginRequest {
    usuario: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    nombres: string;
    apellidos: string;
    rol: string;
}

