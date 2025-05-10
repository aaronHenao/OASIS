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

    public Usuario registrar(CrearUsuarioDto dto) {
        Usuario usuario = new Usuario(
                dto.getNombre(),
                dto.getApellidos(),
                dto.getCedula(),
                dto.getCorreoInstitucional(),
                dto.getContrasena() // Asegúrate que el constructor de Usuario acepte contraseña
        );
        usuarios.add(usuario);
        return usuario;
    }

    public Usuario login(LoginUsuarioDto dto) {
        return usuarios.stream()
                .filter(u -> u.getCorreoInstitucional().equalsIgnoreCase(dto.getCorreoInstitucional()))
                .filter(u -> u.getContrasena().equals(dto.getContrasena())) // Verificación de contraseña
                .findFirst()
                .orElse(null);
    }

    public List<Usuario> listar() {
        return usuarios;
    }
}