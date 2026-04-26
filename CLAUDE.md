# CLAUDE.md

Tento subor je kanonicky kontext pre AI asistenta Claude pracujuceho na projekte `vevsdesign`.
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

- Web uz nie je staticka HTML stranka; aktualne ide o `Next.js` projekt s `App Router`.
- Hlavny vstup webu je `src/app/page.tsx`.
- Globalne styly su v `src/app/globals.css`.
- Jednotlive sekcie webu su rozdelene do komponentov v `src/components/`.
- Jednoducha interaktivita sa pouziva cez React hooks, napriklad `src/hooks/useReveal.ts`.
- Obrazky galerie su v `public/images/gallery/`.
- Logo je subor `public/logo.png`.
- `next.config.ts` pouziva `output: "export"`, takze produkcny build generuje staticky export do `out/`.

## Ako projekt lokalne otvorit

- Pri prvom spusteni treba mat nainstalovane zavislosti: `npm install`
- Vyvojovy server spustis cez: `npm run dev`
- `npm run dev` je uz nakonfigurovany tak, aby bezal stabilne na `http://127.0.0.1:3000`
- Dev script obsahuje workaround pre lokalny Node `localStorage` bug cez `--localstorage-file=/tmp/vevsdesign-localstorage.json`
- Ak je port `3000` obsadeny, pouzi napr.: `npm run dev -- --hostname 127.0.0.1 --port 4173`
- Ak web zrazu nejde na localhoste, prva kontrola je:
  - ci existuje `node_modules`
  - ci bezi `next dev`
  - ci sa neotvara stara URL typu `/preview.html`
  - ci sa naozaj otvara spravna dev URL `http://127.0.0.1:3000`
- Ak chces lokalne overit produkcny shape, pouzi `npm run docker:up` a otvor `http://127.0.0.1:8080`

Ak sa robi vizualna uprava, preferuj menit existujuce komponenty a `src/app/globals.css` iterativne, nie prepisovat cely web bez dovodu.

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

- Produkcny container je buildovany cez `Dockerfile`.
- Build stage spravi `npm run build` a vygeneruje staticky export do `out/`.
- Runtime stage servuje export cez `nginx` konfiguraciu v `nginx/nginx.conf` na porte `8080`.
- Produkcne nasadenie ide cez GitHub Actions -> GHCR image -> `infra` GitOps repo -> Argo CD.
- Kubernetes manifesty su v `/Users/filipcsupka/moje/infra/gitops/apps/vevsdesign/`.
- Domena: `vevsdesign.sk`
- Ingress je rieseny cez Traefik v k3s/Hetzner clustri.
- Verejne HTTPS ma byt riesene cez Cloudflare proxy pred Traefikom; origin zacina cez HTTP, bez cert-managera.

## Pracovne pravidla pre AI

- Tento subor povazuj za prvy zdroj kontextu pri dalsich sessionach.
- Ked sa dohodneme na novych pravidlach, preferenciach alebo obchodnych faktoch, aktualizuj tento subor.
- Ak nieco nie je jasne, najprv skontroluj `CLAUDE.md`, potom `src/app/page.tsx`, `src/components/` a `README.md`.
- Ak upravy menia texty, zachovaj slovencinu, pokial uzivatel neziada inak.
- Ak upravy menia dizajn, preferuj iterativne zmeny nad kompletnym prekopanim, ak to uzivatel vyslovene nechce.

## Poznamka

Toto nie je trvala pamat mimo repozitara. Funguje to tak, ze pri dalsej praci bude tento subor lokalny smerodajny zdroj kontextu pre projekt.
