# Vevsdesign

> AI/project context source of truth: `AGENTS.md`

Prezentačný web pre svadobné štúdio Vevsdesign v Košiciach.

## Aktuálny stack

- `Next.js 15` s `App Router`
- React 19
- globálne štýly v `src/app/globals.css`
- sekcie webu v `src/components/`
- produkčný build sa exportuje staticky do `out/`
- produkčný runtime je `nginx` v Docker image na porte `8080`

## Štruktúra projektu

```text
vevsdesign/
├── src/app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── src/components/
├── src/hooks/
├── public/
│   ├── logo.png
│   └── images/gallery/
├── nginx/nginx.conf
├── Dockerfile
├── docker-compose.yml
├── AGENTS.md
└── CLAUDE.md
```

## Lokálny vývoj

Prvé spustenie:

```bash
npm install
```

Štandardný dev server:

```bash
npm run dev
```

Otvoriť:

```text
http://127.0.0.1:3000
```

Poznámka:
- `npm run dev` už obsahuje workaround pre lokálny Node bug s `localStorage`, takže ho netreba ručne dopĺňať.
- Na bežné zmeny dizajnu netreba robiť Docker build ani produkčný build.

## Lokálne overenie produkčného shape

Ak chceš vidieť to, čo ide do kontajnera:

```bash
npm run docker:up
```

Otvoriť:

```text
http://127.0.0.1:8080
```

Ukončenie:

```bash
npm run docker:down
```

Logy:

```bash
npm run docker:logs
```

## Produkčný build

Statický export:

```bash
npm run build
```

Výstup vznikne v:

```text
out/
```

Tento adresár sa potom kopíruje do nginx runtime image v `Dockerfile`.

## Analytics

Ak chceš počítať zobrazenia webu bez vlastného backendu, projekt podporuje voliteľný Cloudflare Web Analytics beacon.

Stačí v produkčnom builde nastaviť:

```bash
NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN=...
```

Poznámky:
- skript sa vloží len v `production` režime
- bez tejto premennej sa nenačíta nič
- metriky potom uvidíš v Cloudflare dashboarde pri danom webe
- rovnaký pattern môžeš použiť aj v `cv-web`

## Kontakt formulár

Web nepoužíva `FormSubmit`. Očakávaná architektúra formulára je:

```text
browser -> Cloudflare Turnstile -> Cloudflare Worker (/api/contact) -> Cloudflare Email Routing send_email binding -> vevsdesignn@gmail.com
```

Frontend číta tieto build-time premenné:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=/api/contact
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
```

Pri produkčnom Docker builde musia byť tieto `NEXT_PUBLIC_*` premenné dostupné už počas `npm run build`, nie až v runtime kontajnera.

Worker scaffold je v:

```text
cloudflare/contact-worker/
```

Aktuálne implementované riešenie:

- Cloudflare Turnstile chráni formulár na fronte.
- HTTP Cloudflare Worker `vevsdesign-contact` obsluhuje route `vevsdesign.sk/api/contact*`.
- Worker používa `Email` binding s menom `EMAIL`.
- Worker posiela správu na `vevsdesignn@gmail.com`.
- Produkčný web číta `NEXT_PUBLIC_TURNSTILE_SITE_KEY` z GitHub Actions repository variable.
- Produkčný web používa endpoint `NEXT_PUBLIC_CONTACT_ENDPOINT=/api/contact`.

Potrebné runtime vars/secrets vo Workeri:

```text
TURNSTILE_SECRET_KEY
ALLOWED_ORIGIN=https://vevsdesign.sk
CONTACT_TO_EMAIL=vevsdesignn@gmail.com
CONTACT_FROM_EMAIL=noreply@vevsdesign.sk
```

Odporúčaný sender:

```text
noreply@vevsdesign.sk
```

Čo musí byť nastavené v Cloudflare:

1. `Turnstile`:
   widget pre hostname `vevsdesign.sk`
   z neho sa používa `site key` vo fronte a `secret key` vo Workeri
2. `Email Routing`:
   v `Destination Addresses` musí byť `vevsdesignn@gmail.com` a musí byť verified
3. `Workers & Pages` -> `vevsdesign-contact`:
   v `Bindings` musí byť `Email Service` binding s menom `EMAIL`
4. `Workers & Pages` -> `vevsdesign-contact` -> `Settings` -> `Variables and Secrets`:
   `ALLOWED_ORIGIN=https://vevsdesign.sk`
   `CONTACT_FROM_EMAIL=noreply@vevsdesign.sk`
   `CONTACT_TO_EMAIL=vevsdesignn@gmail.com`
   `TURNSTILE_SECRET_KEY` musí byť uložený ako secret, nie plaintext
5. `Workers & Pages` -> `vevsdesign-contact` -> `Domains`:
   route musí byť `vevsdesign.sk/api/contact*`

Poznámky:
- Netreba `Resend` účet ani `RESEND_API_KEY`.
- Netreba ani Cloudflare `Email Sending` platený plan.
- Používa sa Cloudflare Worker s `Email` bindingom v UI, nie platený `Email Sending` produkt.

Čo musí byť nastavené v GitHub:

1. `Settings` -> `Secrets and variables` -> `Actions` -> `Variables`
2. Repository variable:
   `NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site key z Cloudflare Turnstile>`
3. GitHub Actions workflow v `.github/workflows/ci.yml` už build-time premenné posúva do:
   `npm run build`
   Docker build args
4. `NEXT_PUBLIC_CONTACT_ENDPOINT` je v workflow napevno nastavený na `/api/contact`, netreba ho ručne pridávať v GitHub UI

Po zmene Workeru alebo build premenných:

1. pushni zmeny do repozitára
2. spusti GitHub Actions build alebo pushni na `main`
3. po deployi otestuj formulár na `https://vevsdesign.sk`

## Dôležité URL

- dev server: `http://127.0.0.1:3000`
- docker/nginx lokálne: `http://127.0.0.1:8080`
- produkcia: `https://vevsdesign.sk`

## Troubleshooting

Ak localhost nefunguje:

1. Over, že sú nainštalované závislosti:
   `npm install`
2. Spusť dev server:
   `npm run dev`
3. Otvor správnu adresu:
   `http://127.0.0.1:3000`
4. Neotváraj starú neplatnú URL typu `preview.html`.
5. Ak chceš testovať Docker variant, uisti sa, že beží Docker Desktop.

## Kontakty

- Studio: `Vevsdesign`
- Lokalita: `Košice a okolie`
- Kontakt: `Veronika Csupková`
- Email: `vevsdesignn@gmail.com`
- Telefón: `0915 309 721`
- Instagram: `@Vevsdesign`
