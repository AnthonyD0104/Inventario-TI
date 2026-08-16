package com.inventarioti.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.inventarioti.backend.entity.Departamento;
import com.inventarioti.backend.entity.Rol;
import com.inventarioti.backend.entity.Usuario;
import com.inventarioti.backend.repository.DepartamentoRepository;
import com.inventarioti.backend.repository.RolRepository;
import com.inventarioti.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RolRepository rolRepository;
    private final DepartamentoRepository departamentoRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            RolRepository rolRepository,
            DepartamentoRepository departamentoRepository,
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder) {

        this.rolRepository = rolRepository;
        this.departamentoRepository = departamentoRepository;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        System.out.println("Inicializando datos...");

        crearRolSiNoExiste("ADMIN");
        crearRolSiNoExiste("TI");
        crearRolSiNoExiste("RRHH");
        crearRolSiNoExiste("EMPLEADO");

        crearDepartamentoSiNoExiste("Sistemas TI");
        crearDepartamentoSiNoExiste("Recursos Humanos");
        crearAdminSiNoExiste();
    }

    private void crearRolSiNoExiste(String nombreRol) {

        if (rolRepository.findByNombre(nombreRol).isEmpty()) {
            Rol rol = new Rol();
            rol.setNombre(nombreRol);
            rolRepository.save(rol);
            System.out.println("Rol creado: " + nombreRol);
        }
    }

    private void crearDepartamentoSiNoExiste(String nombreDepartamento) {
        if (departamentoRepository.findByNombre(nombreDepartamento).isEmpty()) {
            Departamento departamento = new Departamento();
            departamento.setNombre(nombreDepartamento);
            departamentoRepository.save(departamento);
            System.out.println("Departamento creado: " + nombreDepartamento);
        }
    }

    private void crearAdminSiNoExiste() {
        if (usuarioRepository.findByUsuario("admin").isEmpty()) {
            Rol rolAdmin = rolRepository.findByNombre("ADMIN")
                    .orElseThrow(() ->
                            new RuntimeException("Rol ADMIN no encontrado"));
            Departamento departamento = departamentoRepository
                    .findByNombre("Sistemas")
                    .orElseThrow(() ->
                            new RuntimeException("Departamento Sistemas TI no encontrado"));
            Usuario admin = new Usuario();
            admin.setUsuario("admin");
            admin.setPassword(
                    passwordEncoder.encode("123456")
            );
            admin.setCorreo("admin@iti.com");
            admin.setNombres("Administrador");
            admin.setApellidos("General");
            admin.setCargo("Administrador del sistema");
            admin.setActivo(true);
            admin.setRol(rolAdmin);
            admin.setDepartamento(departamento);
            usuarioRepository.save(admin);
            System.out.println("Usuario administrador creado correctamente.");
        } else {
            System.out.println("El usuario admin ya existe.");
        }
    }
}