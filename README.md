# INST377 Final Project – Anime Release Tracker

## Description
Anime Release Tracker is a web application that helps fans keep track of upcoming and currently airing anime episodes in one centralized place. Instead of checking multiple sources like MyAnimeList, AniList, and streaming platforms, users can view a weekly release schedule, search for titles, and save shows to a watchlist.

## Target Browsers
This project is designed for modern desktop and mobile browsers including:
- Google Chrome (latest versions)
- Mozilla Firefox (latest versions)
- Microsoft Edge (latest versions)
- Safari on macOS / iOS (latest versions)
- Android Chrome browser

The UI is responsive and can be accessed on laptops, tablets, and mobile screens.

---

# Developer Manual

This Developer Manual is written for future developers who may want to maintain or extend the Anime Release Tracker. It explains how to set up the development environment, run the app locally, deploy changes, and understand the backend API and database structure.

## Technology Stack
- Frontend: React + Vite + JavaScript
- Styling: Tailwind CSS
- Routing: React Router
- APIs: Jikan (airing schedules) and AniList (search + metadata)
- Backend: Vercel serverless functions
- Database: Supabase (PostgreSQL)
- Deployment: Vercel

## Local Installation & Setup
**Clone the repository:**
git clone https://github.com/Schwartz22/INST377-Final-Project.git  
cd INST377-Final-Project

**Install dependencies:**
npm install

**Create a .env.local file:**
SUPABASE_URL=https://siqmwrtmtrdqjciysiud.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpcW13cnRtdHJkcWpjaXlzaXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwMTg0OTYsImV4cCI6MjA4MTU5NDQ5Nn0.cZYU7Ggbil3wPd2osIH0RVlqNnfl9aEcb2HCgU4eCNg

**Run the app locally:**
npm run dev

App runs at:
https://inst-377-final-project-ejuaru5gj-ethan-schwartzbergs-projects.vercel.app/

---

## Deployment Instructions (Vercel)

1. Push changes to GitHub
2. Vercel automatically deploys the project

Required environment variables on Vercel:
- SUPABASE_URL
- SUPABASE_ANON_KEY

Build settings:
- Framework: Vite
- Build command: npm run build
- Output directory: dist

Serverless backend functions are stored in:
api/

---

## Backend API Documentation

### GET /api/schedule
Returns airing anime for today.

Example response:
[ { "title": "Example Anime", "episode": 5, "time": "19:00", "image": "https://…" } ]

### GET /api/search?title=<query>
Example:
 /api/search?title=naruto

### GET /api/watchlist
Returns watchlist items.

Example response:
{ "items": [ { "id": "...", "anilist_id": 1, "title": "Test Anime", "poster_url": null, "created_at": "2024-12-21T20:30:00" } ] }

### POST /api/watchlist
Adds a new item to watchlist.

Required body fields:
- anilist_id
- title
- poster_url (optional)

---

## Supabase Database Schema

Table: watchlist

Columns:
- id (uuid, primary key)
- anilist_id (integer, required)
- title (text, required)
- poster_url (text, optional)
- created_at (timestamp, default now())

Row Level Security: Disabled.

---

## Known Bugs & Limitations
- Shared watchlist (no per-user authentication)
- Cannot remove/edit entries yet
- Airing times may differ by timezone
- Anime detail pages not fully implemented
