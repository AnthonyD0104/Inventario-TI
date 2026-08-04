package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.entity.Rol;
import com.inventarioti.backend.repository.RolRepository;
import com.inventarioti.backend.service.interfaces.RolService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RolServiceImpl implements RolService{

    private final RolRepository rolRepository;

    public RolServiceImpl(RolRepository rolRepository){
        this.rolRepository = rolRepository;
    }

    @Override
    public List<Rol> listarRoles() {
        return rolRepository.findAll();
    }
}