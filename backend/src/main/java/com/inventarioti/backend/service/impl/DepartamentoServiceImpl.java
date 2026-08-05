package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.entity.Departamento;
import com.inventarioti.backend.repository.DepartamentoRepository;
import com.inventarioti.backend.service.interfaces.DepartamentoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DepartamentoServiceImpl implements DepartamentoService {

    private final DepartamentoRepository departamentoRepository;

    public DepartamentoServiceImpl(DepartamentoRepository departamentoRepository) {
        this.departamentoRepository = departamentoRepository;
    }

    @Override
    public List<Departamento> listarDept() {
        return departamentoRepository.findAll();
    }

    @Override
    public Optional<Departamento> buscarDeptPorId(Long id) {
        return departamentoRepository.findById(id);
    }

    @Override
    public Departamento guardarDept(Departamento departamento) {
        return departamentoRepository.save(departamento);
    }

    @Override
    public Departamento actualizarDept(Long id, Departamento departamento) {
        departamento.setIdDepartamento(id);
        return departamentoRepository.save(departamento);
    }

    @Override
    public void eliminarDept(Long id) {
        departamentoRepository.deleteById(id);
    }
}