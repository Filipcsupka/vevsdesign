# AGENTS.md

Tento subor je kanonicky kontext pre AI asistenta pracujuceho na projekte `vevsdesign`.
Ak je nieco v konflikte medzi tymto suborom a starsim obsahom inde v projekte, preferuj tento subor.

## Context Protocol (run FIRST, before answering any issue)

1. Load repo-local context: this file + `CLAUDE.md` + `README.md`.
2. For deploy/infra/k8s topics load ops-brain vault `~/Documents/ops-brain/`:
   - `AGENTS.md` (canonical agent rules), `personal-infra/_context.md`, `personal-infra/clusters/khtz.md` (web runs on the khtz k3s cluster via `../infra` GitOps repo)
3. Reply only after context loaded; say which notes you used. New durable facts → propose ops-brain note update.

## Execution Policy — Codex App / Orca Autonomy

- Run normal requested work end-to-end without approval prompts: repo inspection, file edits in scope, `npm install`, builds, tests, lint/format, dev server, local Docker validation, curl/dig, docker ps|logs, git status|log|diff, file reads, greps.
- Read-only diagnostics run IMMEDIATELY, never ask: kubectl get|describe|logs|events|top, curl/dig, docker ps|logs, git status|log|diff, file reads, greps. Chain them fast.
- Approval required BEFORE external/destructive state changes: live cluster mutations (only via `../infra` GitOps repo), deploys, secrets, git push, deletes, production writes, or work outside the requested scope. Present exact command/diff, wait for explicit yes.

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
- Kontakt formular ma byt rieseny cez `Cloudflare Turnstile + Cloudflare Worker + Cloudflare Email binding`, nie cez FormSubmit ani Resend.
- Produkcny build cita `NEXT_PUBLIC_TURNSTILE_SITE_KEY` z GitHub `Settings -> Secrets and variables -> Actions -> Variables`.

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
- Email: `vevsdesignn@gmail.com`
- Telefon: `0915 309 721`
- Instagram: `@Vevsdesign`
- Web obsahuje baliky, doplnkove sluzby, galeriu a kontakt.
- Doplnky na mieru obsahuju aj personalizovane naramky.
- `NFC srdce` je samostatna kategoria v hlavnej navigacii s vlastnou galeriou.

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
- Ak nieco nie je jasne, najprv skontroluj `AGENTS.md`, potom `src/app/page.tsx`, `src/components/` a `README.md`.
- Ak upravy menia texty, zachovaj slovencinu, pokial uzivatel neziada inak.
- Ak upravy menia dizajn, preferuj iterativne zmeny nad kompletnym prekopanim, ak to uzivatel vyslovene nechce.

## Poznamka

Toto nie je trvala pamat mimo repozitara. Funguje to tak, ze pri dalsej praci bude tento subor lokalny smerodajny zdroj kontextu pre projekt.
