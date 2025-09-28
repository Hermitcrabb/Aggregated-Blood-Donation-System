# Aggregated Blood Donation Frontend

A modular React Native (Expo) application that connects donors with hospitals, NGOs and clinics. The experience is designed with a blood-red, dark red and white palette and is structured to support future microservice-powered backends.

## Features
- Donor registration and profile management UI with point calculation awareness.
- Hospital request board with urgency filters and real-time update simulation.
- Geolocation-ready donor discovery experience with filter and sort controls.
- Notifications feed for urgent requests, events and achievements.
- Admin dashboard summarising inventory, escalated cases and top contributors.
- Theming layer and context-driven data store for easy integration with REST or GraphQL services.

## Getting started
1. Install dependencies
   ```bash
   cd frontend
   npm install
   ```
2. Start the Expo development server
   ```bash
   npm run start
   ```
3. Use the Expo Go app (iOS/Android) or the web preview to inspect the UI.

## Architecture overview
- `src/theme`: Theme definitions and provider for consistent branding.
- `src/context`: State container built with React context for donors, requests, notifications and points calculation.
- `src/navigation`: Bottom tab navigator connecting all core screens.
- `src/screens`: Modular screens for donors, hospitals, notifications and admin workflows.
- `src/components`: Reusable UI building blocks such as cards, badges and layout primitives.
- `src/data`: Mock data used until backend APIs are connected.
- `src/hooks`: Utility hooks (e.g., `useRealTimeUpdates`) to plug in real-time transports later.

To connect to future microservices, replace the mock data within `DataContext` with API calls (REST, GraphQL or WebSockets) and migrate the simulated updates to dedicated services.
