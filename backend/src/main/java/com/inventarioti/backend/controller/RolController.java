package com.inventarioti.backend.controller;

import com.inventarioti.backend.entity.Rol;
import com.inventarioti.backend.service.interfaces.RolService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RolController {

    private final RolService rolService;

    public RolController(RolService rolService){
        this.rolService = rolService;
    }

    @GetMapping
    public List<Rol> listarRoles() {
        return rolService.listarRoles();
    }
}
