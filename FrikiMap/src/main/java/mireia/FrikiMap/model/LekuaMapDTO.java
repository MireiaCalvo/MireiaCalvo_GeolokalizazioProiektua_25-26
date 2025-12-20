package mireia.FrikiMap.model;

public class LekuaMapDTO {

    private String izena;
    private double latitud;
    private double longitud;

    public LekuaMapDTO(String izena, double latitud, double longitud) {
        this.izena = izena;
        this.latitud = latitud;
        this.longitud = longitud;
    }

    public String getIzena() {
        return izena;
    }

    public double getLatitud() {
        return latitud;
    }

    public double getLongitud() {
        return longitud;
    }
}
