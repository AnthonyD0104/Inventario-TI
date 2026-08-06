package com.inventarioti.backend.service.impl;

import com.inventarioti.backend.entity.Departamento;
import com.inventarioti.backend.entity.Rol;
import com.inventarioti.backend.entity.Usuario;
import com.inventarioti.backend.repository.DepartamentoRepository;
import com.inventarioti.backend.repository.RolRepository;
import com.inventarioti.backend.repository.UsuarioRepository;
import com.inventarioti.backend.service.interfaces.UsuarioService;
import com.inventarioti.backend.dto.request.UsuarioRequest;
import com.inventarioti.backend.dto.response.UsuarioResponse;
import com.inventarioti.backend.service.mapper.UsuarioMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final DepartamentoRepository departamentoRepository;

    public UsuarioServiceImpl(
            UsuarioRepository usuarioRepository,
            RolRepository rolRepository,
            DepartamentoRepository departamentoRepository) {
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.departamentoRepository = departamentoRepository;
    }

    @Override
    public List<UsuarioResponse> listarUsuarios() {
        return usuarioRepository.findAll()
                .stream()
                .map(UsuarioMapper::toResponse)
                .toList();
    }

    @Override
    public UsuarioResponse buscarUsuarioPorId(Long id) {

        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado."));
        return UsuarioMapper.toResponse(usuario);
    }

    @Override
    public UsuarioResponse guardarUsuario(UsuarioRequest request) {

        Rol rol = rolRepository.findById(request.getIdRol())
                .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
        Departamento departamento = departamentoRepository.findById(request.getIdDepartamento())
                .orElseThrow(() -> new RuntimeException("Departamento no encontrado."));

        Usuario usuario = new Usuario();

        usuario.setUsuario(request.getUsuario());
        usuario.setPassword(request.getPassword());
        usuario.setCorreo(request.getCorreo());
        usuario.setNombre(request.getNombres());
        usuario.setApellido(request.getApellidos());
        usuario.setCargo(request.getCargo());
        usuario.setActivo(true);
        usuario.setRol(rol);
        usuario.setDepartamento(departamento);

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        return UsuarioMapper.toResponse(usuarioGuardado);
    }

    @Override
    public UsuarioResponse actualizarUsuario(Long id, UsuarioRequest request) {

        Usuario usuario = usuarioRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Rol rol = rolRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
        Departamento departamento = departamentoRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Departamento no encontrado"));

        usuario.setUsuario(request.getUsuario());
        usuario.setPassword(request.getPassword());
        usuario.setCorreo(request.getCorreo());
        usuario.setNombre(request.getNombres());
        usuario.setApellido(request.getApellidos());
        usuario.setCargo(request.getCargo());
        usuario.setRol(rol);
        usuario.setDepartamento(departamento);

        Usuario actualizado = usuarioRepository.save(usuario);
        return UsuarioMapper.toResponse(actualizado);
    }

    @Override
    public void eliminarUsuario(Long id) {

        if(!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado.");
        }
        usuarioRepository.deleteById(id);
    }
}
