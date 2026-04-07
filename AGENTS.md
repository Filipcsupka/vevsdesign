# AGENTS.md

Tento subor je kanonicky kontext pre AI asistenta pracujuceho na projekte `vevsdesign`.
Ak je nieco v konflikte medzi tymto suborom a starsim obsahom inde v projekte, preferuj tento subor.

## Projekt

- Nazov: `Vevsdesign`
- Typ: prezentačna webstranka pre manazovanie a vyzdobu svadieb
- Lokalita: Kosice a okolie
- Kontaktna osoba: Veronika Csupkova
- Primarny jazyk webu: slovencina

## Ciel webu

- Prezentovat studio a jeho sluzby.
- Posobit elegantne, jemne, zensky a premium.
- Pomahat navstevnikovi rychlo pochopit ponuku a kontaktovat studio.
- Sluzit ako vizualny zaklad, ktory budeme priebezne upravovat podla feedbacku.

## Aktualny stav kodu

- Web je momentalne staticka stranka bez buildu.
- Hlavny subor je `preview.html`.
- Styly su vlozene priamo v `preview.html`.
- JavaScript sa prakticky nepouziva.
- Obrazky galerie su v `images/gallery/`.
- Logo je subor `Feminine Floral wedding studio logo.png`.

## Ako projekt lokalne otvorit

- Najjednoduchsie spustenie: `python3 -m http.server 4173`
- Potom otvorit: `http://localhost:4173/preview.html`

Ak sa robi len vizualna uprava, preferuj menit priamo `preview.html`, pokial nevznikne jasny dovod na refaktor.

## Dizajnove smerovanie

- Zachovat butikovy, editorial a elegantny charakter.
- Vyhybat sa generickemu SaaS alebo app-like vzhladu.
- Preferovat jemnu, svetlu, romanticku paletu a kvalitnu typografiu.
- Zachovat dojem svadobneho studia, nie technickej aplikacie.

## Obsahove fakty

- Studio: Vevsdesign
- Mesto: Kosice a okolie
- Email: `veronika.csupkova@gmail.com`
- Telefon: `0910 091 009`
- Instagram: `@Vevsdesign`
- Web obsahuje baliky, doplnkove sluzby, galeriu a kontakt.

## Prevadzka a nasadenie

- Produkcne nasadenie je riesene cez `Dockerfile`, `docker-compose.yml`, `nginx.conf` a helper skripty.
- Domena v dokumentacii: `vevsdesign.sk`
- SSL je riesene cez Let's Encrypt a Certbot.

## Pracovne pravidla pre AI

- Tento subor povazuj za prvy zdroj kontextu pri dalsich sessionach.
- Ked sa dohodneme na novych pravidlach, preferenciach alebo obchodnych faktoch, aktualizuj tento subor.
- Ak nieco nie je jasne, najprv skontroluj `AGENTS.md`, potom `preview.html`, potom `README.md`.
- Ak upravy menia texty, zachovaj slovencinu, pokial uzivatel neziada inak.
- Ak upravy menia dizajn, preferuj iterativne zmeny nad kompletnym prekopanim, ak to uzivatel vyslovene nechce.

## Poznamka

Toto nie je trvala pamat mimo repozitara. Funguje to tak, ze pri dalsej praci bude tento subor lokalny smerodajny zdroj kontextu pre projekt.
