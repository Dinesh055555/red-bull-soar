# Red Bull SOAR: companion app (prototype)

Mobile-first web app for the Red Bull SOAR drone concept (Team Mavericks, Off Brand Round 2).
Works on phones as an installable app, and shows inside a phone frame with a guided demo on laptops.

## What works
- **Home**: live heart rate, Adrenaline Trigger status, drone status, quick actions, weekly challenge countdown.
- **Fly**: palm take-off and landing, 6 Athlete flight modes, live telemetry, record timer, photo, return home, slow motion, height / follow / trigger sliders.
- **Adrenaline Trigger**: when heart rate passes your threshold, SOAR goes slow motion, flashes, vibrates and saves a peak clip.
- **Watch**: real Bluetooth heart-rate pairing (Chrome on Android or laptop: Garmin with Broadcast HR, chest straps, many Wear OS / fitness watches), brand picker, live 90 second chart, demo mode for every other phone.
- **Create (reel editor)**: import a video from the phone or use SOAR clips, trim, speed 0.25x to 2x, auto slow motion at the peak, 6 filters, title text, bpm badge, watermark, 9:16 / 1:1 / 16:9, synthesised music, then **export a real MP4 or WebM** that downloads to the phone, shares, and saves to the library.
- **Library**: peaks, exported reels, clips; download, share, edit, delete; auto-save to phone toggle.
- **Community (SOAR Wall)**: post photos or videos from the phone, like, comment, save, share, follow creators, sport filters, #EarnYourWings challenge, heartbeat leaderboard.
- **Spots (SOAR Experiences)**: book filming at adventure spots (package, day, time, people), QR pass, cancel, share, claim your clip with the booking code, partner sign-up.
- **Safe zones**: live map (OpenStreetMap), use my location, example green / yellow / red zones, pre-flight checklist.
- **Profile**: level, stats, badges, drone health, crash cover, Concierge (repair pick-up, flying lesson, call), shop with cart, settings, FAQ, install button.
- Data stays on the device (localStorage + IndexedDB). "Reset demo data" in Profile clears it.

## Run locally
```
node server.js
```
Open http://localhost:3000 (Node 18+, no npm install needed).

## Put it on GitHub
1. Create a new repository on github.com (for example `red-bull-soar-app`).
2. Click **uploading an existing file**, drag in everything inside this folder (`public`, `server.js`, `package.json`, `render.yaml`, `README.md`, `.gitignore`), and commit.

## Deploy on Render
**Option A, Web Service (uses render.yaml):**
New + > Web Service > connect the repo > Runtime **Node** > Build command `echo "No build needed"` > Start command `node server.js` > Free plan > Create.

**Option B, Static Site (no sleeping on the free plan):**
New + > Static Site > connect the repo > Build command: leave empty > Publish directory: `public` > Create.

Your link will look like `https://red-bull-soar-app.onrender.com`. Open it on your phone and use **Add to Home Screen** to install it.

## Notes
- Bluetooth heart rate needs HTTPS (Render gives you that) and a browser with Web Bluetooth (Chrome on Android, Chrome or Edge on laptops). iPhone uses demo mode.
- Map tiles load from OpenStreetMap, so the map needs internet. Zones shown are examples, not official airspace data.
- Video export uses the browser's recorder: MP4 on Safari and recent Chrome, WebM on older Chrome.
