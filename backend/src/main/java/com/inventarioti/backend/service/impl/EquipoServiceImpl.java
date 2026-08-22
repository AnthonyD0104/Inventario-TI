package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.dto.request.EquipoRequest;
import com.inventarioti.backend.dto.response.EquipoResponse;
import com.inventarioti.backend.entity.CategoriaEquipo;
import com.inventarioti.backend.entity.Equipo;
import com.inventarioti.backend.repository.CategoriaEquipoRepository;
import com.inventarioti.backend.repository.EquipoRepository;
import com.inventarioti.backend.service.interfaces.EquipoService;
import com.inventarioti.backend.service.mapper.EquipoMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipoServiceImpl implements EquipoService {
    private final EquipoRepository equipoRepository;
    private final CategoriaEquipoRepository categoriaEquipoRepository;

    public EquipoServiceImpl(
            EquipoRepository equipoRepository,
            CategoriaEquipoRepository categoriaEquipoRepository) {

        this.equipoRepository = equipoRepository;
        this.categoriaEquipoRepository = categoriaEquipoRepository;
    }
    @Override
    public List<EquipoResponse> listarEquipos(){
        return equipoRepository.findByActivoTrue()
                .stream()
                .map(EquipoMapper::toResponse)
                .toList();
    }

    @Override
    public List<EquipoResponse> listarEquiposInactivos() {
        return equipoRepository.findByActivoFalse()
                .stream()
                .map(EquipoMapper::toResponse)
                .toList();
    }
    @Override
    public EquipoResponse buscarEquipoPorId(Long id){
        Equipo equipo = equipoRepository.findById(id)
                .orElseThrow(()->
                        new RuntimeException("Equipo no encontrado"));
        return EquipoMapper.toResponse(equipo);
    }
    @Override
    public EquipoResponse guardarEquipo(EquipoRequest request){
        CategoriaEquipo categoria = categoriaEquipoRepository
                .findById(request.getIdCategoria())
                .orElseThrow(()->
                        new RuntimeException("Categoria de equipo no encontrada"));
        Equipo equipo = new Equipo();

        equipo.setCodigoActivo(request.getCodigoActivo());
        equipo.setNumeroSerie(request.getNumeroSerie());
        equipo.setMarca(request.getMarca());
        equipo.setModelo(request.getModelo());
        equipo.setEstado(request.getEstado());
        equipo.setFechaCompra(request.getFechaCompra());
        equipo.setActivo(true);
        equipo.setCategoria(categoria);

        Equipo equipoGuardado = equipoRepository.save(equipo);
        return EquipoMapper.toResponse(equipoGuardado);
    }
    @Override
    public EquipoResponse actualizarEquipo(
            Long id,
            EquipoRequest request){
        Equipo equipo = equipoRepository.findById(id)
                .orElseThrow(()->
                        new RuntimeException("Equipo no encontrado"));
        CategoriaEquipo categoria = categoriaEquipoRepository
                .findById(request.getIdCategoria())
                .orElseThrow(()->
                        new RuntimeException("Categoria de equipo no encontrada"));
        equipo.setCodigoActivo(request.getCodigoActivo());
        equipo.setNumeroSerie(request.getNumeroSerie());
        equipo.setMarca(request.getMarca());
        equipo.setModelo(request.getModelo());
        equipo.setEstado(request.getEstado());
        equipo.setFechaCompra(request.getFechaCompra());
        equipo.setCategoria(categoria);

        Equipo equipoActualizado = equipoRepository.save(equipo);
        return EquipoMapper.toResponse(equipoActualizado);
    }
    @Override
    public void eliminarEquipo(Long id){
        Equipo equipo = equipoRepository.findById(id)
                .orElseThrow(()->
                        new RuntimeException("Equipo no encontrado"));
        equipo.setActivo(false);
        equipoRepository.save(equipo);
    }

    @Override
    public EquipoResponse restaurarEquipo(Long id) {
        Equipo equipo = equipoRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Equipo no encontrado"));
        equipo.setActivo(true);
        Equipo restaurado = equipoRepository.save(equipo);
        return EquipoMapper.toResponse(restaurado);
    }

}
