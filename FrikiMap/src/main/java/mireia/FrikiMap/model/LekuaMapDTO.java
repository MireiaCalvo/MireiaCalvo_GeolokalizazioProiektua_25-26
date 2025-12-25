package mireia.FrikiMap.model;

public class LekuaMapDTO {

    private String izena;
    private String kategoria;
    private String hiria;
    private String helbidea;
    private double latitud;
    private double longitud;

    public LekuaMapDTO(String izena, String kategoria, String hiria, String helbidea, double latitud, double longitud) {
        this.izena = izena;
        this.kategoria = kategoria;
        this.hiria = hiria;
        this.helbidea = helbidea;
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

    public String getHelbidea(){
        return helbidea;
    }

    public double getLatitud() {
        return latitud;
    }

    public double getLongitud() {
        return longitud;
    }
}
