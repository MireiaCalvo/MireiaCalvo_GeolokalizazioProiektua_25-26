# Bakarkako Lana - Friki Map

### Egilea
- [Mireia Calvo](https://github.com/MireiaCalvo)

---

## Aurkibidea

- [Sarrera](#1--sarrera)
  - [Erabilitako teknologia](#11--erabilitako-teknologia)
  - [Proiektuaren deskribapena](#12--proiektuaren-deskribapena)
- [Ideia](#2--ideia)
- [Interfaze grafikoaren fluxua](#3--interfaze-grafikoaren-fluxua)
- [API Endpoints](#4--api-endpoints)
- [Proiektuaren estruktura](#5--proiektuaren-estruktura)

---

## **1.- SARRERA**
Proiektu hau Geolokalizazio irakasgaiaren bigarren ebaluaketarako egin beharreko lana da, honek pare bat gauza eduki behar ditu derrigorrez:
 - Web orri bat edo mugikorrerako aplikazio bat.
 - Leaflet edo beste progragaren bateko mapa bat.
 - Mapa horretan markadoreak agertu behar dira.
 - Agertzen diren markadoreetako informazioa ezin da eskuz jarrita egon.

### **1.1.- ERABILITAKO TEKNOLOGIA**

#### Backend:
- **Java 21** - Programazio lengoaia
- **Spring Boot 3.4.0** - Web framework-a
- **Spring Data MongoDB** - Datu-basera konektatzeko
- **MongoDB** - NoSQL datu-basea lokalizazioen datuak gordetzeko
- **SpringDoc OpenAPI** - API dokumentaziorako (Swagger UI)
- **Maven** - Proyektuaren kudeaketarako

#### Frontend:
- **HTML5** - Markapen lengoaia
- **CSS3** - Estilozarako
- **JavaScript (ES6+)** - Interaktibitatea
- **Bootstrap 5** - CSS framework-a interfazearen diseinarako
- **Leaflet.js** - Mapa interaktiboa erakusteko
- **Font Awesome** - Ikonoak

### **1.2.- PROIEKTUAREN DESKRIBAPENA**

FrikiMap aplikazio baten arkitektura osoa da, non geolokalizazioak erabiltzen diren friki dendak eta tokiak mapan erakusteko. Proiektua bi zatitan dago:

1. **Backend (FrikiMap)**: REST API bat Spring Boot-ekin eraikita, MongoDB datu-basean datuak gordetzen dituena.
2. **Frontend (Geolokalizazioa)**: Web aplikazio bat HTML, CSS eta JavaScript-ekin eraikita, Leaflet.js erabiltzen duten mapa interaktiboa duen.

## **2.- IDEIA**

FrikiMap aplikazioa friki kultura zalea den jendearentzat sortua da, non jendeak bere inguruko friki dendak eta interesgarri diren tokiak bilatu eta ikusi ahal ditzaten mapa batean. 

**Oinarrizko funtzioak:**
- Tokiak kategoriaren arabera ikusi
- Hiriak arabera ikusi
- Mapa interaktiboa non tokien kokapenaren adierazitako markadoreak agertzen diren
- Bakoitzaren inguruko informazioa (izena, kategoria, hiria, helbidea)


## **3.- INTERFAZE GRAFIKOAREN FLUXUA**

### Pausos-pauso:

1. **Hasiera**: Erabiltzaileak aplikazioa ireki eta hasierako pantaila ikusten non orriaren azalpen txiki bat agertzen den.
2. **Bilaketa**: 
   - Erabiltzaileak botoiekin hiriaren eta kategoriaren arabera filtratzen ditu.
   - APIak filtratutako datu-baseari dagokion datuak itzulitzen ditu
3. **Emaitzak**: Mapan markadoreak agertzen dira datu basetik leku bakoitzaren latitudea eta longitudea erabiliz.
4. **Interakzioa**: Erabiltzaileak markadoreetan klikatu dezake toki horren informazio gehiago ikusteko (izena, kategoria, helbidea, etc.)


## **4.- API ENDPOINTS**

### BaseURL: `http://localhost:8080/lekuak`

| Metodoa | Endpoint | Parametroak | Deskribapena |
|---------|----------|-------------|--------------|
| GET | `/mapa` | - | Mapa erakusteko DTO formatuan topakoak itzultzen ditu |

### Erantzun adibidea:
```json
{
  "izena": "Friki Denda",
  "kategoria": "Denda",
  "hiria": "Bilbao",
  "helbidea": "Calle Principal 123",
  "latitude": 43.2630,
  "longitude": -2.9350
}
```


## **5.- PROIEKTUAREN ESTRUKTURA**

```
MireiaCalvo_GeolokalizazioProiektua_25-26/
├── README.md
├── FrikiMap/                           # Backend (Spring Boot)
│   ├── pom.xml                         # Maven konfigurazioa
│   ├── mvnw / mvnw.cmd                 # Maven wrapper
│   └── src/
│       ├── main/
│       │   ├── java/mireia/FrikiMap/
│       │   │   ├── FrikiMapApplication.java
│       │   │   ├── SpringConfiguration.java
│       │   │   ├── config/
│       │   │   │   └── CorsConfig.java           # CORS konfigurazioa
│       │   │   ├── controller/
│       │   │   │   └── LekuaController.java      # REST endpoints
│       │   │   └── model/
│       │   │       ├── Lekua.java                # Datu-basean tokien modelo
│       │   │       ├── LekuaMapDTO.java          # Frontend-arako DTa
│       │   │       └── LekuaRepository.java      # MongoDB repository
│       │   └── resources/
│       │       └── application.properties        # Aplikazioaren konfigurazioa
│       └── test/
│           └── java/mireia/FrikiMap/
│               └── FrikiMapApplicationTests.java # Test-ak
└── Geolokalizazioa/                    # Frontend
    ├── html/
    │   └── hasiera.html                # Nagusia HTML fitxategia
    ├── css/
    │   └── style.css                   # Estiloak
    └── js/
        ├── estiloak.js                 # Interfazearen logika
        └── mapa-datuak.js              # Mapa eta datuen interakzioa
```

---

### Oharra:

Proiektu hau Bakarkako Lana da 2025-26 ikasturtean. FrikiMap-ek geolokalizazio teknologia erabiltzen du friki kultura fan-ak intereseko tokiak bilatu eta aurkezteko.

**Garapen data**: 2025-12-25
