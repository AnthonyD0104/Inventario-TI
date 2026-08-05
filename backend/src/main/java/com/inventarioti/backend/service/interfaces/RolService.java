package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.entity.Rol;
import java.util.List;
import java.util.Optional;

public interface RolService {

    List<Rol> listarRoles();
    Optional<Rol> buscarRolPorId(Long id);
    Rol guardarRol(Rol rol);
    Rol actualizarRol(Long id, Rol rol);
    void eliminarRol(Long id);
}
