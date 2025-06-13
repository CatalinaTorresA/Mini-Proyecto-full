package com.example.usuarios_backend.controllers;

import com.example.usuarios_backend.entities.Rol;
import com.example.usuarios_backend.repositories.RolRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RolController {

    private final RolRepository rolRepository;

    @GetMapping
    public List<Rol> listarRoles() {
        return rolRepository.findAll();
    }

    @PostMapping
    public Rol crear(@RequestBody Rol rol) {
        return rolRepository.save(rol);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rol> actualizar(@PathVariable Long id, @RequestBody Rol rol) {
        return rolRepository.findById(id).map(r -> {
            rol.setId(id);
            return ResponseEntity.ok(rolRepository.save(rol));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        return rolRepository.findById(id).map(r -> {
            r.setEstado(false);
            rolRepository.save(r);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
