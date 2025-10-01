# Web Frontend (Next.js)

This is the modular **React (Next.js 14)** frontend for the Aggregated Blood Donation System.  
Theme: **blood red (`#C62828`)**, **dark red (`#8B0000`)**, **white**.

## Structure
```
apps/web
├─ app/                 # App Router pages
├─ components/          # Reusable UI (NavBar, RequestsNearYou)
├─ public/              # Static assets
├─ tailwind.config.ts   # Theme colors/tokens
├─ next.config.mjs      # /api/* → http://localhost:8080/* (Spring Gateway)
└─ package.json
```

## Dev
- Start backend gateway at **http://localhost:8080**
- In another terminal:
  ```bash
  cd apps/web
  npm i
  npm run dev
  # open http://localhost:3000
  ```

## Notes
- Home shows the circular **Login**/**Register** CTAs with icons.
- "Live Requests Near You" fetches from `/api/requests` (gateway rewrite).
- Add your auth later; for now, it’s public read.