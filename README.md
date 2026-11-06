# The Barn Hotel — HosDesk + HosFix

Live site: **https://thebarnhotel.hospro.co.uk** (GitHub Pages, repo `barnhotel`, `CNAME` included).
Firebase: the shared HosPRO project `brandonhall-7bdef`. The Barn's data sits in its **own collections**, all prefixed `barn_`, so nothing is shared with Brandon Hall.

## Links to hand out

| Who | Link | Opens |
|---|---|---|
| Reception | `https://thebarnhotel.hospro.co.uk/hosdesk.html?board` | HosDesk console (guest requests · deliveries · maintenance) |
| Catherine Virdee (Manager) | `https://thebarnhotel.hospro.co.uk/hosfix-catherine.html` | Install page → HosFix as Catherine (sees & allocates all jobs) |
| Josh (Operative) | `https://thebarnhotel.hospro.co.uk/hosfix-josh.html` | Install page → HosFix as Josh (own allocated jobs) |
| Anyone reporting a fault | `https://thebarnhotel.hospro.co.uk/hosfix.html?tier=reporter` | Report-a-fault screen |
| Landing page | `https://thebarnhotel.hospro.co.uk/` | Buttons for all of the above |

Access codes (change in `hosfix.html` → `LG_CODES` / `PINS`, and `hosdesk.html` → `BOARD_PIN` / `checkCode`):
- HosFix shared codes: **0000** management · **1111** reporters · **3333** maintenance (same scheme as Brandon)
- HosDesk board PIN (`hosdesk.html?board` on a shared PC): **2580**
- HosDesk Maintenance card code gate: **1357**

## Set-up steps (one-off)

1. **GitHub** — create repo `barnhotel`, copy all these files in, turn on Pages (main branch, root). The `CNAME` file sets the custom domain.
2. **DNS** — add a CNAME record `thebarnhotel` → `orngroup.github.io` (or whichever GitHub Pages host serves hospro.co.uk), then tick "Enforce HTTPS" in the repo's Pages settings once the certificate issues.
3. **Firestore rules** — paste the block in `firestore-rules-barn.txt` into the live rules (Firebase Console → Firestore → Rules → inside `match /databases/{database}/documents {`) and Publish. Without this, saves fail with *permission-denied*.
4. **Push notifications** — nothing to deploy: the existing `register`/`notify` Cloud Function and VAPID key are reused. Catherine and Josh install HosFix from their launcher links and tap *Allow* on alerts. User ids `catherine` and `josh` are unique to The Barn in the shared `fcm_tokens` collection.
5. **Logo** — drop the hotel logo at `assets/barn-logo.png` (white/transparent PNG, ~300 px wide). Until then the header shows the name only.

## Placeholders to fill in once the hotel confirms

- **Rooms** — `barn-config.js` → `BARN_ROOMS` (HosDesk) and `hosfix.html` → `PROPERTY.bedrooms.rooms` (HosFix). Currently rooms 1–60. Rooms can also be saved in Firestore `barn_config/current.rooms`.
- **Areas** — `MAINT_PROP` in `hosdesk.html` and `PROPERTY` in `hosfix.html` (Hawtrey's Restaurant & Bar, Meeting & Events, Public Areas, External/Grounds, Plant & Back of House).
- **Quick links** — `hosdesk.html` → `QUICK_LINKS` (Hotel Information, Website, Local Information, Local Events). Google Maps is already set to West End Road, Ruislip HA4 6JB. A button with no URL shows "Link not set up yet".
- **Fire & Emergency** — the pop-up in `hosdesk.html` is a draft with the Barn address; replace the `[bracketed]` items (assembly point, alarm contractor) with the hotel's own Fire Action Procedure before go-live.
- **Weather** — header widget is set to Ruislip (`forecast7.com/en/51d57n0d42/ruislip/`). If you'd rather generate your own embed at weatherwidget.io for HA4 6JB, swap the `<a class="weatherwidget-io">` line.
- **Suppliers** — `SUPPLIERS` list in `hosdesk.html` (deliveries tab).
- **More people** — add to `USERS` in `hosfix.html`; put manager ids in `MGR_OPS`, operatives in `STD_OPS`; copy a launcher page + manifest per person.

## Files

```
index.html                 landing page with the four links
hosdesk.html               HosDesk reception console (+ hosdesk-manifest.json)
hosfix.html                HosFix maintenance app (manager / operative / reporter by link)
hosfix-catherine.html      Catherine's install page (+ hosfix-manifest-catherine.json)
hosfix-josh.html           Josh's install page      (+ hosfix-manifest-josh.json)
hosfix-manifest*.json      PWA manifests (default, mgr, ops, rep)
hosfix-sw.js               service worker — background push, scoped to this site
barn-config.js             Firebase config + hotel name/address, rooms, staff
firestore-rules-barn.txt   rules block to add to the live Firestore rules
CNAME                      thebarnhotel.hospro.co.uk
assets/                    hero photo, HosDesk/HosFix icons (mgr blue, ops green)
```

Data collections: `barn_fix_jobs` (deletes blocked — jobs are archived, never deleted), `barn_requests`, `barn_deliveries`, `barn_visitors`, `barn_config`.

Clean-start date for jobs: **6 Nov 2026** (`HF_CLEAN_FROM` in `hosfix.html`).
