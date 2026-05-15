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
