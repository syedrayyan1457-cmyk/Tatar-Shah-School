Tatar Shah School — local install & packaging

1) Run locally
   - Use a simple static server (service worker requires http(s)):
     * Python (quick): `python3 -m http.server 8000` from the folder that contains index.html
     * OR use `npx http-server` or serve via any static host.
   - Open http://localhost:8000 in your browser.

2) Install as PWA (Android/Chrome)
   - Visit the site in Chrome on Android, use "Add to Home screen".
   - Or use PWABuilder / Lighthouse to produce installable bundle.

3) Build Android APK (optional)
   - Use Capacitor (recommended) or Cordova:
     * Capacitor quick:
       - `npm init @capacitor/app` and add the web assets (or copy this folder to your web dir).
       - `npx cap add android`
       - `npx cap open android` to open Android Studio and build an APK.
   - Or use PWABuilder to create a Trusted Web Activity.

4) Build Desktop App (optional)
   - Use Electron: create `main.js` wrapping `index.html` and run `electron .`.
   - Or use Tauri for smaller binaries.

5) Notes & behaviour
   - Admin pass default: `147853` (stored in localStorage). Change via Admin Settings.
   - All uploads (images, PDFs) are stored as base64 data URLs in localStorage; this keeps the app truly offline but may hit browser storage limits (large PDFs/images). Consider using server storage for many large files.
   - App is offline-first thanks to service worker + localStorage.