package com.example.usuarios_backend.controllers;

import com.example.usuarios_backend.entities.Usuario;
import com.example.usuarios_backend.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // permite acceso desde frontend
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/login")
    public Usuario login(@RequestBody Usuario credentials) throws Exception {
        Optional<Usuario> usuario = usuarioRepository.findByLoginIgnoreCase(credentials.getLogin());

        if (usuario.isPresent() && usuario.get().getPassword().equals(credentials.getPassword())) {
            return usuario.get(); // En un login real aquí deberías evitar enviar la password
        } else {
            throw new Exception("Credenciales inválidas");
        }
    }
}
