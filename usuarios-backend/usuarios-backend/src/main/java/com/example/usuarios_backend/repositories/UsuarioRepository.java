package com.example.usuarios_backend.repositories;

import com.example.usuarios_backend.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByLoginIgnoreCase(String login);
    boolean existsByLoginIgnoreCase(String login);
}
