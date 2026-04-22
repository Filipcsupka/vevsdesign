# Vevsdesign — Svadobná Výzdoba

> AI/project context source of truth: `AGENTS.md`
>
> `README.md` sluzi hlavne pre cloveka, deployment a prevadzku. Ak chces doplnit trvale instrukcie pre dalsie AI sessiony, upravuj primarne `AGENTS.md`.

Wedding decoration studio website for Veronika Csupková, Košice.

---

## Project structure

```
vevsdesign/
├── preview.html                          # The website (single page)
├── logo.png                                # Logo
├── images/
│   └── gallery/                          # Drop wedding photos here (see Photos section)
├── nginx.conf                            # Web server config (HTTP/2, SSL, caching)
├── Dockerfile                            # Builds the nginx container
├── docker-compose.yml                    # Runs nginx + certbot (auto SSL renewal)
├── init-letsencrypt.sh                   # Run ONCE on server to get SSL certificate
├── deploy.sh                             # Deploy / update the site from your PC
└── convert-images.sh                     # Convert photos to WebP before uploading
```

---

## First-time deployment

### 1. Buy a domain
Register `vevsdesign.sk` at any registrar (Webglobe, Namecheap, etc.).

### 2. Create a Hetzner server
- Go to [hetzner.com/cloud](https://hetzner.com/cloud)
- New Project → Add Server
- Location: **Falkenstein** (closest to Slovakia)
- OS: **Ubuntu 24.04**
- Type: **CX22** (~€3.29/month)
- Add your SSH key during setup

### 3. Point DNS to the server
In your domain registrar → DNS settings, add two A records:

| Type | Name | Value          |
|------|------|----------------|
| A    | @    | YOUR_SERVER_IP |
| A    | www  | YOUR_SERVER_IP |

Wait ~5–30 minutes for DNS to propagate before the next step.

### 4. Deploy for the first time
Run this from your PC (Git Bash or WSL on Windows):

```bash
./deploy.sh YOUR_SERVER_IP --init
```

This will:
- Upload all site files to the server
- Install Docker
- Obtain the SSL certificate from Let's Encrypt
- Start the site at **https://vevsdesign.sk**

---

## Updating the site

Any time you change `preview.html` or add photos, just run:

```bash
./deploy.sh YOUR_SERVER_IP
```

---

## Contact form setup (Formspree)

The contact form sends emails to `veronika.csupkova@gmail.com` via Formspree.

**One-time setup:**
1. Go to [formspree.io](https://formspree.io) and sign up with `veronika.csupkova@gmail.com`
2. Create a new form → you get an ID like `xpzgkwqr`
3. Open `preview.html` and find this line:
   ```html
   <form action="https://formspree.io/f/REPLACE_WITH_YOUR_ID" method="POST">
   ```
4. Replace `REPLACE_WITH_YOUR_ID` with your actual form ID
5. Redeploy: `./deploy.sh YOUR_SERVER_IP`

Free plan: 50 submissions/month. Paid plan ($10/month) for more.

---

## Photos / Gallery

### Workflow for adding photos

1. Put original photos (JPG/PNG from phone or camera) into `images/gallery/`

2. Convert to WebP (smaller files, faster loading):
   ```bash
   # Install ImageMagick first if you don't have it
   # Linux/server:  apt install imagemagick
   # Mac:           brew install imagemagick
   # Windows WSL:   apt install imagemagick

   ./convert-images.sh
   ```

3. Rename the output `.webp` files to `01.webp`, `02.webp`, ... `06.webp`
   (or update `preview.html` to add more gallery items)

4. Deploy:
   ```bash
   ./deploy.sh YOUR_SERVER_IP
   ```

### Adding more than 6 photos
Open `preview.html`, find the `gallery-placeholder-grid` section and add more items:
```html
<div class="gal-item"><img src="images/gallery/07.webp" alt="Popis fotky" class="gal-img" loading="lazy"><div class="gal-overlay"></div></div>
```

---

## SSL certificate

SSL is handled automatically by Let's Encrypt via Certbot running inside Docker.

- Certificate is valid for **90 days**
- Certbot checks for renewal **every 12 hours** — you never need to do this manually
- Certificate files are stored in a Docker volume (`certbot-certs`)

**If something goes wrong with SSL:**
```bash
ssh root@YOUR_SERVER_IP
cd /opt/vevsdesign
docker compose logs certbot
```

---

## Local testing (Docker Desktop)

You can preview the site locally before deploying:

```bash
# Start locally — site runs at http://localhost
docker compose up --build
```

Note: SSL won't work locally (no domain), but the page will load over HTTP fine for testing.

---

## Tech stack

| What | How |
|------|-----|
| Website | Single HTML file with embedded CSS, no JavaScript |
| Fonts | Google Fonts (Cormorant Garamond + Jost) |
| Web server | nginx (alpine) with HTTP/2 |
| SSL | Let's Encrypt via Certbot (auto-renewing) |
| Deployment | Docker + docker-compose on Hetzner VPS |
| Contact form | Formspree (no backend needed) |
| Images | WebP format, lazy loaded |

---

## Contacts

| | |
|---|---|
| **Studio** | Vevsdesign — Košice & okolie |
| **Contact** | Veronika Csupková |
| **Phone** | 0910 091 009 |
| **Email** | veronika.csupkova@gmail.com |
| **Instagram** | [@Vevsdesign](https://instagram.com/vevsdesign) |
