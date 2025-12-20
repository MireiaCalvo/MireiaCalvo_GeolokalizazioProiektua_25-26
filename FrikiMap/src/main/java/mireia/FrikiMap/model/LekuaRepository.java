package mireia.FrikiMap.model;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface LekuaRepository extends MongoRepository<Lekua, ObjectId> {

    List<Lekua> findByIzenaContainingIgnoreCase(String izena);

    List<Lekua> findByKategoria(String kategoria);

    List<Lekua> findByHiria(String hiria);
}
