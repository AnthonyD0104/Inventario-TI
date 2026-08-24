package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.entity.Rol;
import com.inventarioti.backend.repository.RolRepository;
import com.inventarioti.backend.service.interfaces.RolService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

// Servicio: lógica de roles
@Service
public class RolServiceImpl implements RolService {

    private final RolRepository rolRepository;

    public RolServiceImpl(RolRepository rolRepository){
        this.rolRepository = rolRepository;
    }

    // Lista todos los roles
    @Override
    public List<Rol> listarRoles() {
        return rolRepository.findAll();
    }

    // Busca un rol por su ID
    @Override
    public Optional<Rol> buscarRolPorId(Long id){
        return rolRepository.findById(id);
    }

    // Crea un rol
    @Override
    public Rol guardarRol(Rol rol) {
        return rolRepository.save(rol);
    }

    // Actualiza un rol por ID
    @Override
    public Rol actualizarRol(Long id, Rol rol){
        rol.setIdRol(id);
        return rolRepository.save(rol);
    }

    // Elimina un rol por ID
    @Override
    public void eliminarRol(Long id) {
    rolRepository.deleteById(id);
    }
}
