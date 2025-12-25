package mireia.FrikiMap.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lekuak")
public class Lekua {

    @Id
    private String id;

    private String izena;
    private String kategoria;
    private String hiria;
    private String helbidea;

    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPoint location;

    public Lekua() {
    }

    public Lekua(String izena, String kategoria, String hiria, String helbidea, double longitud, double latitud) {
        this.izena = izena;
        this.kategoria = kategoria;
        this.hiria = hiria;
        this.helbidea = helbidea;
        // GeoJsonPoint uses (longitude, latitude) order
        this.location = new GeoJsonPoint(longitud, latitud);
    }

    // GETTERS ETA SETTERS
    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getHelbidea(){
        return helbidea;
    }

    public void setHelbidea(String helbidea){
        this.helbidea = helbidea;
    }

    public GeoJsonPoint getLocation() {
        return location;
    }

    public void setLocation(GeoJsonPoint location) {
        this.location = location;
    }

    public double getLatitude() {
        return location != null ? location.getY() : 0.0;
    }

    public double getLongitude() {
        return location != null ? location.getX() : 0.0;
    }
}