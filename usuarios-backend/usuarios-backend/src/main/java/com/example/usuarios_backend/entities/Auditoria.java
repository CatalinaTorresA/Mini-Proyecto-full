package com.example.usuarios_backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Auditoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tabla;

    private String operacion;

    private LocalDateTime fechaEvento;

    private String usuarioEvento;

    @Column(name = "registro_id")
    private Long registroId;
}
