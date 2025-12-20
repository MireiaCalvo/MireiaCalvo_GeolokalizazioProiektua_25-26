package mireia.FrikiMap.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;


@Document(collection = "lekuak")
public class Lekua {

    @Id
    private ObjectId id;

    private String izena;
    private String kategoria;
    private String hiria;

    private GeoJsonPoint location;

    public Lekua() {
    }

    public Lekua(String izena, String kategoria, String hiria, double longitud, double latitud) {
        this.izena = izena;
        this.kategoria = kategoria;
        this.hiria = hiria;
        this.location = new GeoJsonPoint(longitud, latitud);
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getIzena() {
        return izena;
    }

    public void setIzena(String izena) {
        this.izena = izena;
    }

    public String getKategoria() {
        return kategoria;
    }

    public void setKategoria(String kategoria) {
        this.kategoria = kategoria;
    }

    public String getHiria() {
        return hiria;
    }

    public void setHiria(String hiria) {
        this.hiria = hiria;
    }

    public GeoJsonPoint getLocation() {
        return location;
    }

    public void setLocation(GeoJsonPoint location) {
        this.location = location;
    }

    public double getLatitud() {
        return location.getY();
    }

    public double getLongitud() {
        return location.getX();
    }
}
