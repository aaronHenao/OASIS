package com.udem.reservas.backend.controller;

import com.udem.reservas.backend.dto.CrearUsuarioDto;
import com.udem.reservas.backend.dto.LoginUsuarioDto;
import com.udem.reservas.backend.model.Usuario;
import com.udem.reservas.backend.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin("*")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/registrar")
    public ResponseEntity<Usuario> registrar(@RequestBody CrearUsuarioDto dto) {
        Usuario usuario = service.registrar(dto);
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginUsuarioDto dto) {
        Usuario usuario = service.login(dto);
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(401).body("Credenciales incorrectas");
        }
    }

    @GetMapping
    public List<Usuario> listar() {
        return service.listar();
    }
}