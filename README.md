# Bakarkako Lana - Friki Map
### Egilea

- [Mireia Calvo](https://github.com/MireiaCalvo)

##
## Aurkibidea

- [Sarrera](#1--sarrera)
  - [Erabilitako teknologia](#11--erabilitako-teknologia)
- [Ideia](#2--ideia)
- [Interfaze grafikoaren fluxua](#3--INTERFAZE-GRAFIKOAREN-FLUXUA)
- [API Endpoints](#4--API-Endpoints)
 

##
## **1.- SARRERA**:
Hirrugarren ebaluazioko azterketa egitera ez nagoenez derrigortuta baldintza batzuk dauzkan proiektu bat entregatzeko aukera daukat. Hauek dira proiektuak bete behar dituen ezaugarriak:
  - Java lengoaiaren notazioa erabat errespetatu du: Maius-minus, Oharrak: javadoc eta besteak, Alineazioak, Aldagaien izen egokiak
  - Berariazko (JDK eta beste liburutegietakoak) klase ugari eta anitzak erabili ditu eta ondo erabili ere
  - Egoera bakoitzean kontrol egitura egokiena eta modu egokienean erabili du.
  - Proiektu osoa klase egokietan antolatu du OOP eredua jarraituz.
  - Pantaila eta kontrol egokiak dituen programa funtzional eta exekuzio errorerik gabea garatu du.
  - Datu mota desberdinak erabili ditu; modu egokian erabili ere.
  - Sortutako klase/interfazeen artean konposizio, herentzia eta inplementazio erlazio egokiak daude.

### <ins>1.1.- ERABILITAKO TEKNOLOGIA</ins>:

Aplikazioa sortzeko JavaFX erabili dugu, eta programazio-lengoaia nagusia Java izan da.

Aplikazioaren atal grafikoan agertzen diren elementu guztiak kokatzeko SceneBuilder izeneko tresna erabili dugu. Honek .fxml motako fitxategiak sortzeko eta editatzeko aukera ematen digu, aplikazioaren interfaze grafikoa modu errazagoan diseinatzeko. 
Atal hauen itxura aldatzeko, CSS bidez egokitu dugu, Modena estiloko fitxategiak erabiliz, elementuen ID-aren edo izenaren arabera itxura pertsonalizatzeko.

Aplikazioaren atal logikoa Java erabiliz garatu dugu. FXML fitxategientzat controller desberdinak sortu ditugu, bertan eszena bakoitzean erabiltzailearen ekintzak kontrolatzeko (adibidez: botoien ekintzak, irudiak erakutsi, testuak azaleratu, etab.).

Gainera, datuen persistentzia bermatzeko, aplikazioa datu-base batera konektatu dugu. Honela, erabiltzailearen informazioa eta sistemaren funtzionamendurako beharrezkoak diren datuak gordeta geratzen dira eta ez dira galdu aplikazioa itxi edo berrabiaraztean. 
Datu-basearekin komunikazioa egiteko beharrezkoak diren konexioak eta kontsultak Java bidez kudeatu ditugu.

## **2.- IDEIA**
Nire ideia ez da oso originala baina nire gogoko gai baten ingurukoa da. Nire ideia bideojokoaen zerrenda moduko bat edukitzea aplikazioan. Aplikazioak sesioz hasteko atal bat edukiko du hasieran, honetan erabiltzaileak bere username eta pasahitzak jarri beharko ditu sartzeko. Behin bertan sartuta hasierako horri bat agertuko da non bere zerrenden inguruko datuak agertuko dira. Ezkerraldean menu txiki bat egongo da, horretan hainbat aukera egongo dira ala nola bere perfila aldatzeko aukera eta bere zerrendetan jokoak sartu, ezabatu eta mugitzeko.

Bi erabiltzaile mota egongo dira: admin eta user. Admin motako erabiltzaileak aplikazioan botere gehiago edukiko dute, hauei erabiltzaileak deituko den atal bat agertuko zaie eta bertan beste erabiltzaileen datuak aldatu eta ezabatzeko aukera edukiko dute, ezingo dituzte erabiltzaileak sortu horretarako sesioa hasteko horrian erabiltzaile berri bat sortzeko aukera jarri dudalako. Horretaz aparte jokoen zerrendan joko berriak sartzeko aukera edukiko dute.

Erabiltzaile normalek beraien jokoen zerrenda desberdinak edukiko dituzte: desiratuak, nire jokoak eta jokatutakoak.
 - Desiratuak: zerrenda honetan erosi ez dituzun baina jokatu nahi dituzun jokoak sartu ahalko dira.
 - Nire jokoak: bertan jada dauzkazun baina jokatu ez dituzun jokoak egongo dira,
 - Jokatutakoak: honetan jada jokatu dituzun jokoak egongo dira.

Hiru zerrenda hauetan zehar jokoak mugitzeko aukera edukiko du erabiltzaileak ala nola joko berriak sartzeko aplikazioan dauden jokoen zerrendatik.

##
## **3.- INTERFAZE GRAFIKOAREN FLUXUA IDEIA**:

##
## **4.- API Endpoints**:
