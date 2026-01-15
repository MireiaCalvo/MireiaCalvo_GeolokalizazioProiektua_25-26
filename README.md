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
- [Web orriaren itzura](#4--web-orriaren-itzura)
  - [Hasiera orria](#41--hasiera-orria)
  - [Maparen orria](#42--maparen-orria)
- [API Endpoints](#5--api-endpoints)
- [Proiektuaren estruktura](#6--proiektuaren-estruktura)

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
- **HTML5** - Markatze lengoaia
- **CSS3** - Estilorako
- **JavaScript (ES6+)** - Interaktibitatea
- **Bootstrap 5** - CSS framework-a interfazearen diseinurako
- **Leaflet.js** - Mapa interaktiboa erakusteko
- **Font Awesome** - Ikonoak

### **1.2.- PROIEKTUAREN DESKRIBAPENA**

FrikiMap aplikazio baten arkitektura osoa da, non geolokalizazioa erabiltzen den friki dendak eta tokiak mapan erakusteko. Proiektua bi zatitan dago banatuta:

1. **Backend (FrikiMap)**: REST API bat Spring Boot-ekin eraikita, MongoDB datu-basean datuak gordetzen dituena.
2. **Frontend (Geolokalizazioa)**: Web aplikazio bat HTML, CSS eta JavaScript-ekin eraikita, Leaflet.js erabiltzen duen mapa interaktiboa duena.

## **2.- IDEIA**

FrikiMap aplikazioa friki kultura zalea den jendearentzat sortua da, non jendeak bere inguruko friki dendak eta interesgarri diren tokiak bilatu eta ikusi ahal ditzaten mapa batean. 

**Oinarrizko funtzioak:**
- Tokiak kategoriaen arabera ikusi
- Hirien arabera ikusi
- Mapa interaktiboa non tokien kokapenaren markadoreak agertzen diren
- Kokapen bakoitzaren inguruko informazioa (izena, kategoria, hiria, helbidea)


## **3.- INTERFAZE GRAFIKOAREN FLUXUA**

### Pausos-pauso:

1. **Hasiera**: Erabiltzaileak aplikazioa ireki eta hasierako pantaila ikusten du non orriaren azalpen txiki bat agertzen den.
2. **Filtraketa**: 
   - Erabiltzaileak botoiekin hiriaren eta kategoriaren arabera filtratzen ditu.
   - APIak filtratutakoaren arabera dagokion datuak itzulitzen ditu
3. **Emaitzak**: Mapan markadoreak agertzen dira datu basetik leku bakoitzaren latitudea eta longitudea erabiliz.
4. **Interakzioa**: Erabiltzaileak markadoreetan klikatu dezake toki horren informazio gehiago ikusteko (izena, kategoria, helbidea, etc.)


## **4.- WEB ORRIAREN ITZURA**

Hemen web orriak duen itzura erakutziko dut, honek bi css desberdin ditu zeinak JavaScript bidez kontrolatzen diren. Bata modu argia da, honetan erabiltzen diren koloreak txuria, urdin argia
eta beste honelako kolore argiak dauzka. Beste modu iluna da, honetan bere izenak adierazten duen bezala kolore ilunak erabiltzen ditut ala nola beltza, grisa... 

### **4.1.- HASIERA ORRIA**

Hasierako orria oso simplea da, bertan web orria zertarako den azaltzen du, baita modu argi eta ilunaren azalpen txiki bat ere badauka.

**MODU ARGIA**
<img width="1081" height="914" alt="Image" src="https://github.com/user-attachments/assets/43163587-809a-4c18-8c49-d5f88a93dc00" />


**MODU ILUNA**
<img width="1084" height="919" alt="Image" src="https://github.com/user-attachments/assets/fde741ad-88dc-4d0a-bf70-eaa80fd02e6a" />


### **4.2.- MAPAREN ORRIA**

Atal honek mami geihago dauka, goiko aldean mapan agertzen diren markadoreen kolorea adierazten da eta horiek zerekin dauden erlazionaturik. Bertan era kokapenen inguruko estatistika simple batzuk agertzen dira,
ala nola momentuan datu basean daude kokapenen kopurua, kategoria kopurua eta hiri kopurua.

Beherago, maparen ondoan kategoriare eta hiriaren arabera filtratzeko botoiak daude, aukeratutako botoiaren arabera mapan agertzen diren markadoreak aldatuko dira.

Honek ere, hasierako orriak bezala modu argi eta ilunaren artean aldatzeko botoi bat dauka.

**MAPAREN BIDEOA**

https://github.com/user-attachments/assets/81a178b3-a915-46ca-be56-8a4d420f57ea


## **5.- API ENDPOINTS**

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


## **6.- PROIEKTUAREN ESTRUKTURA**

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
