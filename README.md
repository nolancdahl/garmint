# Garmint

Your wardrobe, considered. A personal style management PWA.

## Quick start (you are here)

### 1. Extract this folder somewhere clean

Recommended: `C:\Users\YourName\Code\garmint` or `C:\projects\garmint`.

Avoid: Desktop, Downloads, OneDrive folders. OneDrive sync conflicts with `node_modules` and will cause weird errors.

### 2. Open PowerShell in that folder

Right-click inside the folder while holding Shift → "Open PowerShell window here". Or in any PowerShell window, `cd` to the folder.

### 3. Install dependencies

```powershell
npm install
```

This downloads React, Vite, and the PWA plugin. Takes 1-2 minutes. Creates a `node_modules` folder (~200MB, that's normal).

### 4. Run it locally

```powershell
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`) in Chrome. The app should load. Try adding a closet item to confirm everything works.

`Ctrl+C` in the terminal to stop the dev server.

### 5. Open in Cursor

In Cursor: File → Open Folder → pick this folder. The project is now ready for Claude Code edits.

## Pushing to GitHub

### 6. Create the repo on GitHub

Go to https://github.com/new. Name it `garmint`. Private or public, your call. Don't initialize with a README, .gitignore, or license (we already have those).

### 7. Push from your machine

In PowerShell, in this folder:

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/garmint.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

If git asks you to log in, follow the prompts. On Windows, the easiest auth path is GitHub CLI: `winget install GitHub.cli` then `gh auth login`.

## Deploying to Netlify

### 8. Connect Netlify to the GitHub repo

1. Go to https://app.netlify.com (sign up with GitHub if needed)
2. Click "Add new site" → "Import an existing project"
3. Pick GitHub, authorize, select the `garmint` repo
4. Build settings should auto-detect from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

First deploy takes ~2 minutes. Netlify gives you a URL like `https://random-name-12345.netlify.app`.

### 9. Rename the URL (optional)

In Netlify → Site configuration → Change site name. Pick something like `garmint-nolan` so the URL is `https://garmint-nolan.netlify.app`. This URL is stable forever.

### 10. Install on your Android phone

1. Open the Netlify URL in Chrome on your Android phone
2. Tap the three-dot menu in Chrome
3. Tap "Install app" or "Add to home screen"
4. Confirm

Garmint now lives on your home screen as an icon. Tapping it opens the app full-screen with no browser chrome. Your closet data persists locally on your phone.

## The development loop, from here on

```
1. Open the project in Cursor
2. Run `npm run dev` in a terminal pane (Cursor has a built-in terminal: Ctrl+`)
3. Run `claude` in another terminal pane to start Claude Code
4. Tell Claude Code what to change
5. See changes live at http://localhost:5173 in your browser
6. When happy, commit and push:
   git add .
   git commit -m "What I changed"
   git push
7. Netlify auto-deploys in ~90 seconds
8. Refresh on your phone (pull down to reload, or close and reopen the app)
```

## Project structure

```
garmint/
├── public/                  # Static assets (icons, favicon)
├── src/
│   ├── components/          # Reusable UI pieces
│   │   ├── Header.jsx
│   │   ├── BottomNav.jsx
│   │   ├── WeatherTile.jsx
│   │   ├── AddItemDropdown.jsx
│   │   ├── PasteUrlDropdown.jsx
│   │   ├── ItemDetailModal.jsx
│   │   ├── WishlistItemDetail.jsx
│   │   ├── ChatPopup.jsx
│   │   ├── MintLeavesLogo.jsx
│   │   ├── Icons.jsx
│   │   ├── Primitives.jsx       # Small shared UI bits
│   │   ├── PickerRow.jsx
│   │   └── AnchoredDropdown.jsx
│   ├── pages/               # One file per top-level page
│   │   ├── HomePage.jsx
│   │   ├── ClosetPage.jsx
│   │   ├── ShoppingPage.jsx
│   │   └── OtherPages.jsx       # Calendar, Stats, Inspiration, Expert, Profile
│   ├── lib/
│   │   ├── theme.js             # Colors + fonts
│   │   ├── constants.js         # Category data, storage keys
│   │   └── storage.js           # localStorage + image resize helpers
│   ├── App.jsx              # Top-level routing
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles + animations
├── index.html
├── vite.config.js           # Build config + PWA manifest
├── netlify.toml             # Deploy config
└── package.json
```

## Known limitations

- **Image storage:** browser localStorage caps around 5-10MB. Resized images are ~50-150KB each, so you can fit ~50-100 items before hitting the wall.
- **No cross-device sync:** your closet on your phone and your closet on your laptop are separate. We'd need to add a backend (Supabase is the easy path) to sync.
- **Microlink rate limit:** the free tier of the URL metadata service is ~50 requests/day. Fine for personal use.
- **Some sites block scraping:** Octobre Editions specifically returns inconsistent metadata. Major sites (Taylor Stitch, COS, Mango, Everlane) work well.

## What's next on the roadmap

- Chunk 4: Inspiration library with image upload
- Chunk 5: Calendar outfit logging
- Chunk 6: Stats aggregations
- Chunk 7: AI-powered chat and Style Expert
- Optional: Supabase backend for cross-device sync
- Optional: Capacitor wrapper for native Android `.apk`
