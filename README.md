# Netflix Clone - Movie Streaming App + Admin Panel + APKs

A full-featured Netflix-inspired movie streaming platform with bottom navigation, hero banners, search, categories, and a complete admin control system. **Now with Android APK builds for both User and Admin apps via GitHub Actions!**

Built with React + Vite + Tailwind CSS + React Router + Capacitor.

## 📱 APK Builds (New!)

This repo builds **two separate APKs**:

1. **Netflix User APK** - `com.netflix.user` - Main streaming app for users
   - Bottom Navigation, Hero Banner, Search, Categories, Video Player
   - Install: `Netflix-User-v1.0.apk`

2. **Netflix Admin APK** - `com.netflix.admin` - Admin control panel
   - Controls all app system, manages movies via direct video links + thumbnails
   - Auto-redirects to `/admin` on launch
   - Install: `Netflix-Admin-v1.0.apk`

### How APKs Are Built

- **Capacitor** wraps the web app (dist) into native Android projects:
  - `android-user/` - User app native project
  - `android-admin/` - Admin app native project
- **GitHub Actions Workflow** `.github/workflows/build-apk.yml`:
  - Builds web app (`npm run build`)
  - Prepares admin build with `window.IS_ADMIN_APK` flag injection (`scripts/prepare-admin.js`)
  - Copies assets to both android projects (`scripts/prepare-android.js`)
  - Runs `./gradlew assembleDebug` for both
  - Uploads APKs as **Artifacts**:
    - `netflix-user-apk`
    - `netflix-admin-apk`
    - `netflix-both-apks`
    - `netflix-apks-renamed` (Netflix-User-v1.0.apk, Netflix-Admin-v1.0.apk)

### Download APKs

1. Go to **Actions** tab in GitHub
2. Click latest workflow run **"Build Netflix APKs (User + Admin)"**
3. Scroll to **Artifacts** section
4. Download:
   - `netflix-user-apk` - User app
   - `netflix-admin-apk` - Admin app
   - Or `netflix-apks-renamed` - Both renamed

### Manual APK Build Locally

```bash
# Install deps
npm install

# Build web + prepare admin
npm run build
node scripts/prepare-admin.js
node scripts/prepare-android.js

# Build User APK (requires Android SDK)
cd android-user
./gradlew assembleDebug
# APK at: app/build/outputs/apk/debug/app-debug.apk

# Build Admin APK
cd ../android-admin
./gradlew assembleDebug
# APK at: app/build/outputs/apk/debug/app-debug.apk
```

## 🎬 Features

### Client App (Netflix Clone)
- **Bottom Navigation** (mobile) + Top Navigation (desktop) - Home, Search, Coming Soon, Downloads, More
- **Hero Banner** - Auto-rotating featured movies with play & info buttons
- **Search Bar** - Live search filtering by title, description, category
- **Category Rows** - Horizontal scrollable rows (Trending Now, Top 10, Action, Comedy, Horror, Romance, Sci-Fi, Drama)
- **Movie Cards** - Netflix-style hover expansion with quick actions
- **Video Player** - Plays direct video links (MP4, WebM) with fullscreen
- **Movie Detail Modal** - Full info, cast, rating, views, thumbnail & banner URLs
- **My List** - Add/remove favorites (persisted in localStorage)
- **Responsive** - Mobile-first, Netflix dark theme (#141414, #E50914)

### Admin Panel (Controls All System)
Access at `/admin` - Password: `admin123` or `netflix`

- **Dashboard** - Stats: total movies, categories, banners, views
- **Movies Manager** - Full CRUD:
  - Title, Description, Year, Rating, Duration, Age Rating
  - **Thumbnail URL** (poster 500x750)
  - **Banner URL** (wide 1920x1080)
  - **Video Direct Link** (MP4 direct URL - plays in app player)
  - Trailer URL, Categories, Cast, Director, Featured/Trending flags
  - Live preview of images
- **Categories Manager** - Add/edit/delete categories with colors
- **Banners Manager** - Control homepage hero carousel:
  - Select movies for banner rotation
  - Order banners (drag up/down)
  - Toggle active/inactive
  - Preview banner
- **Settings** - App name, logo, colors, export/import JSON backup, reset data

### Video System
- All videos added via **direct link** (no upload needed)
- Supports any public MP4 URL
- Sample free videos included from Google public bucket
- Thumbnail & Banner via direct image URLs (Unsplash, etc)
- Player uses HTML5 video with poster support

## 🚀 Quick Start (Web)

```bash
npm install
npm run dev
```

Open http://localhost:5173

- Main App: `/`
- Search: `/search`
- My List: `/mylist`
- Admin: `/admin` (password: admin123)

## 📁 Project Structure

```
src/
  components/
    Header.jsx - Top nav with search
    HeroBanner.jsx - Auto-rotating hero
    MovieCard.jsx - Netflix card with hover
    CategoryRow.jsx - Horizontal rows
    BottomNavigation.jsx - Mobile nav
    MovieModal.jsx - Detail modal
    VideoPlayer.jsx - Fullscreen player
  pages/
    Home.jsx
    SearchPage.jsx
    MyListPage.jsx
  admin/
    AdminLayout.jsx - Sidebar + layout
    AdminLogin.jsx
    Dashboard.jsx
    MoviesManager.jsx - Video + thumbnail CRUD
    CategoriesManager.jsx
    BannersManager.jsx
    SettingsManager.jsx
  context/
    MovieContext.jsx - Global state + localStorage DB
  data/
    seedData.js - Initial movies, categories, banners

android-user/ - Capacitor Android project for User APK (com.netflix.user)
android-admin/ - Capacitor Android project for Admin APK (com.netflix.admin)

scripts/
  prepare-admin.js - Injects admin flag into dist-admin
  prepare-android.js - Copies dist to android assets

.github/workflows/
  build-apk.yml - Builds both APKs and uploads as artifacts

capacitor.config.json - Default user config
capacitor.config.user.json - User APK config
capacitor.config.admin.json - Admin APK config
```

## 💾 Data Storage

Uses localStorage as database (no backend needed for demo):
- `netflix_movies`
- `netflix_categories`
- `netflix_banners`
- `netflix_settings`
- `netflix_mylist`

Export/import backup in Settings page.

## 🎥 Adding Videos (Admin Controls All System)

1. Go to `/admin` → Login `admin123`
2. Movies → Add Movie
3. Fill:
   - **Video Direct Link**: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`
   - **Thumbnail**: `https://images.unsplash.com/photo-...?w=500&h=750`
   - **Banner**: `https://images.unsplash.com/photo-...?w=1920&h=1080`
   - Categories, etc.
4. Save → Appears instantly in client app
5. For banner: Go to Banners → Add Banner → Select movie

All video, thumbnail, banner management is via **direct URLs** - no upload server needed!

## 🔧 Tech Stack

- React 19 + Vite
- Tailwind CSS 3.4
- React Router 7
- Capacitor 8 (Android APK wrapper)
- localStorage persistence
- Netflix UI design system
- GitHub Actions for APK builds

## 📱 APK Details

| APK | Package | App Name | Entry | Purpose |
|-----|---------|----------|-------|---------|
| User | com.netflix.user | Netflix | `/` | Streaming for users - bottom nav, banners, search, categories |
| Admin | com.netflix.admin | Netflix Admin | `/admin` | Controls all system - movies, banners, categories, direct video links |

Both APKs are built from same web codebase, admin APK auto-detects via `window.IS_ADMIN_APK` flag.

## 🔐 Admin Login

- Password: `admin123` or `netflix` or `admin`
- Stored in localStorage as `admin_auth`

Enjoy! 🎬 Build APKs via Actions tab!
