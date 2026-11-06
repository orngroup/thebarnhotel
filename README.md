# The Barn Hotel — HosDesk + HosFix

Live site: **https://thebarnhotel.hospro.co.uk** (GitHub Pages, repo `barnhotel`, `CNAME` included).
Firebase: the shared HosPRO project `brandonhall-7bdef`. The Barn's data sits in its **own collections**, all prefixed `barn_`, so nothing is shared with Brandon Hall.

## Links to hand out

| Who | Link | Opens |
|---|---|---|
| Reception | `https://thebarnhotel.hospro.co.uk/hosdesk.html?board` | HosDesk console (deliveries · maintenance) |
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

## Hotel data (as supplied by the hotel, 6 Nov 2026)

- **70 bedrooms in 4 buildings** — Shirley's Farm Building (1, 2, 3, 7 ground; 4, 5, 6 first), Middle Building (10–27 ground; 28–44 first), Back Building (45–52 ground; 53–60 first), Deanes Lodge (301–310 ground; 311–316 first). Held in `barn-config.js` → `BARN_ROOMS` (HosDesk) and `hosfix.html` → `PROPERTY` (HosFix), one area per building.
- **Other areas** — Guest & Public (Reception, Dining Room, Windsor Room / Meeting Room, Games Room …), Back of House (Kitchen, Laundry Room, Staff Linen Room, Bin Area, Boiler Rooms 1–4 …), External / Grounds (Driveway, Fences, Car Park, Gardens …).
- **Work types** — Plumbing, Electrical / Heating, Fences / Driveway, Painting & Decorating, Locks, Flooring, Fire Safety, Other.
- **Team** — Catherine Virdee (Manager, code 0000), Josh (Maintenance, code 3333), Security / Reception and Mani (Housekeeping) as reporters (code 1111).
- **Fire alarm contractor** — Terry Owens, Syndicate Fire Protection Service Ltd, 01843 265389 / 07743 231527, info@syndicatefireprotection.co.uk (in the Fire & Emergency pop-up).

## Still to fill in

- **Assembly point** in the Fire & Emergency pop-up (`hosdesk.html`) — currently "[To be confirmed by the hotel]".
- **Quick links** — `hosdesk.html` → `QUICK_LINKS` (Hotel Information, Website, Local Information, Local Events). Google Maps is already set. A button with no URL shows "Link not set up yet".
- **Logo** at `assets/barn-logo.png`.
- **Suppliers** list for the deliveries tab (`SUPPLIERS` in `hosdesk.html`).
- To add people later: `USERS` in `hosfix.html` (managers in `MGR_OPS`, operatives in `STD_OPS`, reporters in `REPORTER_TIER`), plus a launcher page + manifest per installed user.

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

Rooms are also read from Firestore `barn_config/current.rooms` if that document exists, so the list can be changed without a code upload.

Clean-start date for jobs: **6 Nov 2026** (`HF_CLEAN_FROM` in `hosfix.html`).
