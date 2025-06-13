package com.example.usuarios_backend.repositories;

import com.example.usuarios_backend.entities.Auditoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditoriaRepository extends JpaRepository<Auditoria, Long> {
}
