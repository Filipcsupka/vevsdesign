# Cloudflare Guide for Vevsdesign

This guide documents how to move `vevsdesign.sk` from Websupport DNS to Cloudflare and enable page-view analytics.

## Current state

- Domain registrar: `websupport.sk`
- DNS is currently managed in Websupport
- Production website is a static export served through `nginx`
- Origin currently starts on HTTP behind Traefik
- Cloudflare account is currently empty

## Goal

- Put `vevsdesign.sk` behind Cloudflare proxy
- Keep the website working during the DNS move
- Enable Cloudflare Web Analytics
- Keep manual code fallback available only if automatic analytics injection is not enough

## Important warning before switching DNS

Before changing nameservers, copy all current DNS records from Websupport.

Pay special attention to:

- `A`, `AAAA`, `CNAME` records for the website
- `MX` records for email
- `TXT` records for SPF, DKIM, DMARC
- any Google, Microsoft, or other verification records
- any subdomains like `www`, `mail`, `autodiscover`, `smtp`, `imap`

If these records are not copied correctly, the website or email can break.

## Part 1: Add the domain to Cloudflare

1. Log in to Cloudflare.
2. Click `Add a domain`.
3. Enter `vevsdesign.sk`.
4. Choose the Free plan.
5. Let Cloudflare import the current DNS records.
6. Review every imported DNS record carefully.

## Part 2: Review DNS records in Cloudflare

Make sure the imported records match Websupport.

Proxy settings:

- website records like `@` and `www`: set to `Proxied` orange cloud
- mail-related records: set to `DNS only` gray cloud

Do not proxy mail records.

## Part 3: Disable DNSSEC first if enabled

If DNSSEC is enabled in Websupport, disable it before changing nameservers.

If you skip this, the domain can stop resolving after the switch.

## Part 4: Change nameservers in Websupport

After DNS review, Cloudflare will show two assigned nameservers.

In Websupport:

1. Open the domain administration.
2. Go to `DNS`.
3. Open `Nameserver`.
4. Switch to custom nameservers.
5. Replace Websupport nameservers with the two Cloudflare nameservers.
6. Save the change.

DNS propagation can take a few hours, sometimes up to 24 hours.

## Part 5: Wait until Cloudflare shows the zone as active

Do not continue with analytics until Cloudflare confirms the zone is active.

Once active:

- Cloudflare is now managing DNS
- proxied website traffic goes through Cloudflare

## Part 6: Set SSL/TLS mode

Because the current origin is HTTP-only, start with:

- `SSL/TLS` -> `Overview` -> `Flexible`

This means:

- visitor to Cloudflare: HTTPS
- Cloudflare to origin: HTTP

Important:

- do not force HTTP to HTTPS on the origin while using `Flexible`
- otherwise you can create redirect loops

After the site is stable, a better long-term setup is:

- install an origin certificate on Traefik
- switch Cloudflare to `Full (strict)`

That is the preferred final state.

## Part 7: Enable Cloudflare Web Analytics

After the zone is active and the website records are proxied:

1. Open `Web Analytics` in Cloudflare.
2. Click `Add a site`.
3. Select `vevsdesign.sk`.
4. Finish setup.

For proxied sites, Cloudflare can inject analytics automatically.

That means in the normal case:

- no extra endpoint is needed
- no database is needed
- no visible public counter is needed unless we want one later

## Part 8: Verify analytics

After enabling analytics:

1. Open `https://vevsdesign.sk`.
2. Browse a few pages or sections.
3. Wait a few minutes.
4. Check Cloudflare `Web Analytics` dashboard.

Expected result:

- page views begin appearing in the Cloudflare dashboard

## Existing code fallback in this repo

There is already a manual Cloudflare analytics fallback in:

- [src/app/layout.tsx](/Users/filipcsupka/moje/vevsdesign/src/app/layout.tsx:15)

This fallback loads the Cloudflare beacon only in production when:

- `NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN` is set

This is useful only if:

- automatic Cloudflare injection does not work
- or the site is not proxied through Cloudflare

If automatic Cloudflare setup works, this code is not required for normal operation.

## Recommended rollout order

1. Add `vevsdesign.sk` to Cloudflare.
2. Verify imported DNS.
3. Change nameservers in Websupport.
4. Wait for Cloudflare to become active.
5. Set `SSL/TLS` mode to `Flexible`.
6. Confirm the live website still works.
7. Enable `Web Analytics`.
8. Confirm page views appear in the dashboard.
9. Later, move origin to `Full (strict)` when origin HTTPS is ready.

## Repeat for cv-web

The same Cloudflare onboarding flow can be repeated for `cv-web`.

The only things that change are:

- the domain name
- the DNS records for that site
- the final analytics hostname in Cloudflare

## Source references

- Cloudflare full setup: <https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/>
- Cloudflare nameserver update: <https://developers.cloudflare.com/dns/nameservers/update-nameservers/>
- Cloudflare Web Analytics: <https://developers.cloudflare.com/web-analytics/get-started/>
- Cloudflare Flexible SSL: <https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/flexible/>
- Cloudflare Full strict SSL: <https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/>
- Cloudflare redirect loop troubleshooting: <https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/>
- Websupport NS records: <https://www.websupport.sk/podpora/kb/ns-zaznamy/>
- Websupport Cloudflare guide: <https://www.websupport.sk/podpora/kb/cloudflare/>
