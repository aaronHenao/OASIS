package com.udem.reservas.backend.service;

import com.udem.reservas.backend.dto.CrearUsuarioDto;
import com.udem.reservas.backend.dto.LoginUsuarioDto;
import com.udem.reservas.backend.model.Usuario;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {
    private final List<Usuario> usuarios = new ArrayList<>();

    public UsuarioService() {
        usuarios.add(new Usuario(
            "Admin", "Admin", "0000", "admin@udem.edu.co", "admin123"
        ));
    }

    public Usuario registrar(CrearUsuarioDto dto) {
        Usuario usuario = new Usuario(
                dto.getNombre(),
                dto.getApellidos(),
                dto.getCedula(),
                dto.getCorreoInstitucional(),
                dto.getContrasena()
        );
        usuarios.add(usuario);
        return usuario;
    }

    public Usuario login(LoginUsuarioDto dto) {
        return usuarios.stream()
                .filter(u -> u.getCorreoInstitucional().equalsIgnoreCase(dto.getCorreoInstitucional()))
                .filter(u -> u.getContrasena().equals(dto.getContrasena()))
                .findFirst()
                .orElse(null);
    }

    public List<Usuario> listar() {
        return usuarios;
    }

    public boolean esAdmin(Usuario usuario) {
        return usuario.getCorreoInstitucional().equalsIgnoreCase("admin@udem.edu.co");
    }
}