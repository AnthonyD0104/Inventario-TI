package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.entity.Departamento;

import java.util.List;
import java.util.Optional;

public interface DepartamentoService {

    List<Departamento> listarDept();
    Optional<Departamento> buscarDeptPorId(Long id);
    Departamento guardarDept(Departamento departamento);
    Departamento actualizarDept(Long id, Departamento departamento);
    void eliminarDept(Long id);
}
