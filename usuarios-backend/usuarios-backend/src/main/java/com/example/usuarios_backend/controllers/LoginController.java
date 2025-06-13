package com.example.usuarios_backend.controllers;

import com.example.usuarios_backend.dto.LoginRequest;
import com.example.usuarios_backend.entities.Usuario;
import com.example.usuarios_backend.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByLoginIgnoreCase(request.getLogin());
        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (usuario.getPassword().equals(request.getPassword())) {
                return ResponseEntity.ok("✅ Login exitoso");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("❌ Credenciales inválidas");
    }
}
