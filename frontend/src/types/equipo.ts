// Type: equipo del inventario (respuesta)
export interface EquipoResponse {
    idEquipo: number;
    codigoActivo: string;
    numeroSerie: string;
    marca: string;
    modelo: string;
    estado: string;
    fechaCompra: string;
    activo: boolean;
    idCategoria: number;
    categoria: string;
}

// Type: datos para crear o actualizar un equipo
export interface EquipoRequest {
    codigoActivo: string;
    numeroSerie: string;
    marca: string;
    modelo: string;
    estado: string;
    fechaCompra: string;
    idCategoria: number;
}
