package mireia.FrikiMap.controller;

import mireia.FrikiMap.model.Lekua;
import mireia.FrikiMap.model.LekuaMapDTO;
import mireia.FrikiMap.model.LekuaRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/lekuak")
@CrossOrigin
public class LekuaController {

    private final LekuaRepository lekuaRepository;

    public LekuaController(LekuaRepository lekuaRepository) {
        this.lekuaRepository = lekuaRepository;
    }

    // 🔍 Buscar por izena
    @GetMapping("/bilatu/izena")
    public List<Lekua> bilatuIzena(@RequestParam String izena) {
        return lekuaRepository.findByIzenaContainingIgnoreCase(izena);
    }

    // 🏷️ Buscar por kategoria (Denda / Jatetxea)
    @GetMapping("/bilatu/kategoria")
    public List<Lekua> bilatuKategoria(@RequestParam String kategoria) {
        return lekuaRepository.findByKategoria(kategoria);
    }

    // 🏙️ Buscar por hiria
    @GetMapping("/bilatu/hiria")
    public List<Lekua> bilatuHiria(@RequestParam String hiria) {
        return lekuaRepository.findByHiria(hiria);
    }

    // 🗺️ Datos mínimos para Leaflet
    @GetMapping("/mapa")
    public List<LekuaMapDTO> lortuMapaDatuak() {
        return lekuaRepository.findAll()
                .stream()
                .map(l -> new LekuaMapDTO(
                        l.getIzena(),
                        l.getLatitud(),
                        l.getLongitud()
                ))
                .collect(Collectors.toList());
    }
}
