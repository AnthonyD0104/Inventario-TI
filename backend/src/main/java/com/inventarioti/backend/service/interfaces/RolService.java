package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.entity.Rol;
import java.util.List;
import java.util.Optional;

// Contrato: operaciones de roles
public interface RolService {

    // Lista todos los roles
    List<Rol> listarRoles();
    // Busca un rol por su ID
    Optional<Rol> buscarRolPorId(Long id);
    // Crea un rol
    Rol guardarRol(Rol rol);
    // Actualiza un rol por ID
    Rol actualizarRol(Long id, Rol rol);
    // Elimina un rol por ID
    void eliminarRol(Long id);
}
