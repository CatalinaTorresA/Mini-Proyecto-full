package com.example.usuarios_backend.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 40, nullable = false, unique = true)
    private String login;

    @Column(length = 200, nullable = false)
    private String password;

    @Column(nullable = false)
    private String nombres;

    @Column(nullable = false)
    private String apellidos;

    @ManyToOne
    @JoinColumn(name = "tipo_doc_id", nullable = false)
    private TipoDocumento tipoDocumento;

    @Column(nullable = false)
    private String numeroDoc;

    @Column(nullable = false)
    private String genero;

    @Column(nullable = false)
    private String email;

    private String telefono;

    @ManyToOne
    @JoinColumn(name = "rol_id", nullable = false)
    private Rol rol;

    private LocalDate fechaNacimiento;

    private String foto;

    private Boolean estado;

    private String usuarioEvento;

    private LocalDate fechaEvento;
}
