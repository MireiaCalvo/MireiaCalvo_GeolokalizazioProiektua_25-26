package mireia.FrikiMap.controller;

import mireia.FrikiMap.model.Lekua;
import mireia.FrikiMap.model.LekuaMapDTO;
import mireia.FrikiMap.model.LekuaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/lekuak")
@CrossOrigin(origins = {
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    "file://"
})
public class LekuaController {

    @Autowired
    private final LekuaRepository lekuaRepository;

    public LekuaController(LekuaRepository lekuaRepository) {
        this.lekuaRepository = lekuaRepository;
    }

    // izena-gatik ikusi
    @GetMapping("/izena")
    public List<Lekua> bilatuIzena(@RequestParam String izena) {
        return lekuaRepository.findByIzenaContainingIgnoreCase(izena);
    }

    // kategoriagatik ikusi
    @GetMapping("/kategoria")
    public List<Lekua> bilatuKategoria(@RequestParam String kategoria) {
        return lekuaRepository.findByKategoria(kategoria);
    }

    // hiriagatik ikusi
    @GetMapping("/bilatu/hiria")
    public List<Lekua> bilatuHiria(@RequestParam String hiria) {
        return lekuaRepository.findByHiria(hiria);
    }
   
    // Leaflet-entzako datuak
    @GetMapping("/mapa")
    public List<LekuaMapDTO> lortuMapaDatuak() {
        List<Lekua> lekuak = lekuaRepository.findAll();
        System.out.println("Número de lekuak en BD: " + lekuak.size());
        lekuak.forEach(l -> System.out.println(l.getIzena() + " -> " + l.getLocation()));

        return lekuak.stream()
                .map(l -> new LekuaMapDTO(l.getIzena(), l.getKategoria(), l.getHiria(), l.getLatitude(), l.getLongitude()))
                .collect(Collectors.toList());
    }

}
