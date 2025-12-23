package mireia.FrikiMap.model;

public class LekuaMapDTO {

    private String izena;
    private String kategoria;
    private String hiria;
    private double latitud;
    private double longitud;

    public LekuaMapDTO(String izena, String kategoria, String hiria, double latitud, double longitud) {
        this.izena = izena;
        this.kategoria = kategoria;
        this.hiria = hiria;
        this.latitud = latitud;
        this.longitud = longitud;
    }

    public String getIzena() {
        return izena;
    }

    public String getKategoria(){
        return kategoria;
    }

    public String getHiria(){
        return hiria;
    }

    public double getLatitud() {
        return latitud;
    }

    public double getLongitud() {
        return longitud;
    }
}
