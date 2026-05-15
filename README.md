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
browser -> Cloudflare Turnstile -> Cloudflare Worker (/api/contact) -> Resend -> vevsdesignn@gmail.com
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

Potrebné secrets/vars pre Worker:

```text
RESEND_API_KEY
RESEND_FROM
TURNSTILE_SECRET_KEY
ALLOWED_ORIGIN=https://vevsdesign.sk
CONTACT_TO_EMAIL=vevsdesignn@gmail.com
```

Odporúčaný sender pre Resend:

```text
Vevsdesign <noreply@vevsdesign.sk>
```

Postup čo ďalej:

1. V Cloudflare vytvor `Turnstile` widget pre hostname `vevsdesign.sk`.
2. Ulož si `site key` a `secret key`.
3. V Resend pridaj a over doménu `vevsdesign.sk`.
4. V Resend vytvor API key pre odosielanie emailov.
5. Nastav sender napríklad `Vevsdesign <noreply@vevsdesign.sk>`.
6. Deployni Worker z adresára `cloudflare/contact-worker/`.
7. Vo Worker nastav secrets:
   `RESEND_API_KEY`
   `TURNSTILE_SECRET_KEY`
8. Vo Worker nastav vars:
   `RESEND_FROM=Vevsdesign <noreply@vevsdesign.sk>`
   `ALLOWED_ORIGIN=https://vevsdesign.sk`
   `CONTACT_TO_EMAIL=vevsdesignn@gmail.com`
9. V Cloudflare priraď Worker route na `vevsdesign.sk/api/contact*`.
10. V produkčnom build/deploy pipeline nastav build-time premenné:
    `NEXT_PUBLIC_CONTACT_ENDPOINT=/api/contact`
    `NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site key z Cloudflare>`
11. Sprav nový build a redeploy webu.

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
- Telefón: `0910 091 009`
- Instagram: `@Vevsdesign`
