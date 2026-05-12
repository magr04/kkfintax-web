# KKFintax — Bc. Kateřina Kerplová

Next.js 14 web pre účtovnú kanceláriu.

## Spustenie lokálne

```bash
npm install
npm run dev
```

Web beží na http://localhost:3000

## Deploy na Vercel

1. Klientka si vytvorí účet na vercel.com
2. New Project → import GitHub repo
3. Vercel automaticky detekuje Next.js a deployuje

## Calendly embed

V súbore `app/page.tsx` nájdi komentár:
```
{/* Sem vlož Calendly inline embed kód */}
```

Nahraď placeholder týmto kódom (z Calendly → Share → Embed):
```html
<div className="calendly-inline-widget" data-url="https://calendly.com/TVOJ-LINK" style={{minWidth:320,height:630}}/>
<script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async/>
```

## Kontakt / Email formulár

Formulár momentálne nemá backend. Pre produkciu odporúčam:
- **Formspree** (formspree.io) — zadarmo do 50 správ/mesiac
- **Resend** — ak chceš vlastný email handling

## Farby

- Primary: `#8B0000` (CMYK C0 M100 Y80 K50)
- Dark: `#6d0000`

## Štruktúra

```
app/
  layout.tsx    — metadata, html wrapper
  page.tsx      — celý web (single page)
components/
  images.ts     — base64 fotky a logo (auto-generated)
```
