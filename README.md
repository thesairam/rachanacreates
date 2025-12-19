# rarecreates

# Rachana Creates — Website

Three-page Vue site for showcasing mehndi work.

## Pages
- Home: General showcase and description
- Designs: Gallery of variety of designs (placeholders for now)
- Contact: Instagram and WhatsApp links

## Theme
Dark green / beige-brown palette. Modern, elegant, and simple.

## Media Uploads
Place your images in `public/media/` (e.g. `public/media/designs/`). The gallery currently uses placeholder SVGs in `public/media/placeholders/`.

## Run Locally

```bash
# If you use nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install 22
nvm use 22

# Install deps and start
npm install
npm run dev
```

Open the dev URL printed in the terminal.

## Instagram Integration (Optional)
- This repo can pull your latest Instagram posts at build time using the Instagram Basic Display API.
- Create a Facebook app and obtain a (long-lived) `INSTAGRAM_TOKEN` for your account.
- Create a file `.env.local` in project root with:

```
INSTAGRAM_TOKEN=YOUR_LONG_LIVED_TOKEN
```

- Fetch latest posts (writes `public/instagram.json`):

```bash
npm run fetch:instagram
```

- The Designs and Home pages will load from `instagram.json` when present; they fall back to placeholders otherwise.

### Get an Instagram Token (Basic Display API)
Follow these one-time steps to generate a long‑lived token for the account that owns the content (e.g., `@rachana.createss`).

1) Create the app
- Go to https://developers.facebook.com/ and create an app (type: "Consumer").
- Add the product: "Instagram Basic Display".

2) Configure OAuth
- In Instagram Basic Display settings, add a Valid OAuth Redirect URI. For local dev you can use something you can capture, e.g. `https://oauth.pstmn.io/v1/callback` (Postman) or a local endpoint like `http://localhost:5173/auth/instagram`.
- Note your `App ID` and `App Secret`.

3) Add your Instagram account as a Tester
- In the Instagram product settings, add your Instagram username under "User Token Generator" or "Instagram Testers".
- Accept the tester invite from your Instagram account (Settings → Websites/Apps → Tester Invites).

4) Authorize and get a `code`
- Open this URL in a browser (fill in values):

```
https://api.instagram.com/oauth/authorize?client_id=APP_ID&redirect_uri=REDIRECT_URI&scope=user_profile,user_media&response_type=code
```

- After login/consent, you’ll be redirected to `REDIRECT_URI?code=...`. Copy the `code` param.

5) Exchange the code for a short‑lived token

```bash
curl -X POST https://api.instagram.com/oauth/access_token \
  -F client_id=APP_ID \
  -F client_secret=APP_SECRET \
  -F grant_type=authorization_code \
  -F redirect_uri=REDIRECT_URI \
  -F code=CODE_FROM_STEP_4
```

Copy `access_token` from the response (short‑lived, ~1 hour) and `user_id`.

6) Exchange for a long‑lived token (valid ~60 days)

```bash
curl "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=APP_SECRET&access_token=SHORT_LIVED_TOKEN"
```

This returns `access_token` (long‑lived). Put it in `.env.local`:

```
INSTAGRAM_TOKEN=LONG_LIVED_TOKEN
```

7) Refresh the token before it expires (optional)

```bash
curl "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=LONG_LIVED_TOKEN"
```

8) Fetch your latest media into the site

```bash
npm run fetch:instagram
```

Notes:
- In Development mode, only the app’s Instagram Testers can generate tokens and access media. To use other accounts, the app must go Live and pass Facebook review.
- Keep tokens secret; don’t commit `.env.local`. Use CI secrets or server-side fetches in production.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
