package com.example.usuarios_backend.controllers;

import com.example.usuarios_backend.entities.TipoDocumento;
import com.example.usuarios_backend.repositories.TipoDocumentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-documento")
@RequiredArgsConstructor
public class TipoDocumentoController {

    private final TipoDocumentoRepository tipoDocumentoRepository;

    @GetMapping
    public List<TipoDocumento> listar() {
        return tipoDocumentoRepository.findAll();
    }

    @PostMapping
    public TipoDocumento crear(@RequestBody TipoDocumento tipoDocumento) {
        return tipoDocumentoRepository.save(tipoDocumento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoDocumento> actualizar(@PathVariable Long id, @RequestBody TipoDocumento tipoDocumento) {
        return tipoDocumentoRepository.findById(id).map(t -> {
            tipoDocumento.setId(id);
            return ResponseEntity.ok(tipoDocumentoRepository.save(tipoDocumento));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        return tipoDocumentoRepository.findById(id).map(t -> {
            t.setEstado(false);
            tipoDocumentoRepository.save(t);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
