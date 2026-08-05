package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.entity.Rol;
import com.inventarioti.backend.repository.RolRepository;
import com.inventarioti.backend.service.interfaces.RolService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RolServiceImpl implements RolService {

    private final RolRepository rolRepository;

    public RolServiceImpl(RolRepository rolRepository){
        this.rolRepository = rolRepository;
    }

    @Override
    public List<Rol> listarRoles() {
        return rolRepository.findAll();
    }

    @Override
    public Optional<Rol> buscarRolPorId(Long id){
        return rolRepository.findById(id);
    }

    @Override
    public Rol guardarRol(Rol rol) {
        return rolRepository.save(rol);
    }

    @Override
    public Rol actualizarRol(Long id, Rol rol){
        rol.setIdRol(id);
        return rolRepository.save(rol);
    }

    @Override
    public void eliminarRol(Long id) {
    rolRepository.deleteById(id);
    }
}
