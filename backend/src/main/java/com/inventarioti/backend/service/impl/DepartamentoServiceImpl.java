package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.entity.Departamento;
import com.inventarioti.backend.repository.DepartamentoRepository;
import com.inventarioti.backend.service.interfaces.DepartamentoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

// Servicio: lógica de departamentos
@Service
public class DepartamentoServiceImpl implements DepartamentoService {

    private final DepartamentoRepository departamentoRepository;

    public DepartamentoServiceImpl(DepartamentoRepository departamentoRepository) {
        this.departamentoRepository = departamentoRepository;
    }

    // Lista todos los departamentos
    @Override
    public List<Departamento> listarDept() {
        return departamentoRepository.findAll();
    }

    // Busca un departamento por su ID
    @Override
    public Optional<Departamento> buscarDeptPorId(Long id) {
        return departamentoRepository.findById(id);
    }

    // Crea un departamento
    @Override
    public Departamento guardarDept(Departamento departamento) {
        return departamentoRepository.save(departamento);
    }

    // Actualiza un departamento por ID
    @Override
    public Departamento actualizarDept(Long id, Departamento departamento) {
        departamento.setIdDepartamento(id);
        return departamentoRepository.save(departamento);
    }

    // Elimina un departamento por ID
    @Override
    public void eliminarDept(Long id) {
        departamentoRepository.deleteById(id);
    }
}
