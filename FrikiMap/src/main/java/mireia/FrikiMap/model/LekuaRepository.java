package mireia.FrikiMap.model;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LekuaRepository extends MongoRepository<Lekua, String>{

    List<Lekua> findAll();

    List<Lekua> findByIzenaContainingIgnoreCase(String izena);

    List<Lekua> findByKategoria(String kategoria);

    List<Lekua> findByHiria(String hiria);
}
