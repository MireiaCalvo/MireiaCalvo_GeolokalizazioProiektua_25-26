package mireia.FrikiMap.model;

public class LekuaMapDTO {

    private String izena;
    private String kategoria;
    private double latitud;
    private double longitud;

    public LekuaMapDTO(String izena, String kategoria, double latitud, double longitud) {
        this.izena = izena;
        this.kategoria = kategoria;
        this.latitud = latitud;
        this.longitud = longitud;
    }

    public String getIzena() {
        return izena;
    }

    public String getKategoria(){
        return kategoria;
    }

    public double getLatitud() {
        return latitud;
    }

    public double getLongitud() {
        return longitud;
    }
}
