package com.inventarioti.backend.service.interfaces;

import com.inventarioti.backend.entity.Departamento;

import java.util.List;
import java.util.Optional;

// Contrato: operaciones de departamentos
public interface DepartamentoService {

    // Lista todos los departamentos
    List<Departamento> listarDept();
    // Busca un departamento por su ID
    Optional<Departamento> buscarDeptPorId(Long id);
    // Crea un departamento
    Departamento guardarDept(Departamento departamento);
    // Actualiza un departamento por ID
    Departamento actualizarDept(Long id, Departamento departamento);
    // Elimina un departamento por ID
    void eliminarDept(Long id);
}
