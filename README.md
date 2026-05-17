# 🎧 MusicFlow API (Backend)

A backend service for the **MusicFlow music streaming platform**, built with **NestJS (TypeScript)** as part of the RS School Angular course project.

This API powers the frontend application by handling authentication, user data, playlists, uploaded tracks, and listening history.

---

## 🚀 Project Overview

MusicFlow API provides a secure and scalable backend for a Spotify-like music platform.

It is responsible for:

- 🔐 User authentication (JWT-based)
- 📂 Playlist management
- 🎵 User-uploaded tracks
- ❤️ Favorites & interaction data
- 📊 Listening history tracking

The service integrates with the **Jamendo API** for public music catalog data and uses a custom database for user-generated content.

---

## 🛠 Tech Stack

- ⚙️ NestJS (TypeScript)
- 🗄 PostgreSQL
- 🧩 Prisma ORM
- 🔐 JWT Authentication
- 📦 Multer (file uploads)
- 🌐 REST API architecture

---

## 📡 External API

This project uses:

🎵 Jamendo API v3.0  
https://developer.jamendo.com/v3.0/

Used for:
- Tracks
- Albums
- Artists
- Search & discovery

Note: Jamendo API is read-only for this project.  
User-generated data is handled by this backend.

---

## 📋 API Endpoints

### 🔐 Auth
- `POST /auth/register` — User registration (email + password)
- `POST /auth/login` — User login (returns JWT)

### 📂 Playlists
- `GET /playlists` — Get user playlists
- `POST /playlists` — Create playlist
- `PUT /playlists/:id` — Update playlist (name, description, order)
- `DELETE /playlists/:id` — Delete playlist

### 🎵 Tracks
- `POST /tracks/upload` — Upload audio file
- `GET /tracks` — Get user uploaded tracks
- `DELETE /tracks/:id` — Delete uploaded track

### 📊 History
- `GET /history` — Get recently played tracks
- `POST /history` — Save played track

---

## 🧠 Architecture

The project follows standard NestJS modular architecture:

- `auth` — authentication logic (JWT, login, register)
- `users` — user management
- `playlists` — playlist CRUD & ordering
- `tracks` — uploaded tracks handling
- `history` — listening history tracking

---

## 🗄 Database

Uses **PostgreSQL** with Prisma ORM.

Main models:

- User
- Playlist
- Track
- PlaylistTrack
- History

---

## 🔐 Authentication

Authentication is based on **JWT tokens**.

Flow:

1. User registers or logs in
2. Backend returns JWT token
3. Frontend stores token
4. Token is sent via `Authorization: Bearer`
5. Protected routes validated using Guards

---

## 📦 File Uploads

Audio files are uploaded via multipart form-data.

Stored locally (development stage) or via external storage in production.

---

## 🌐 Deployment

Recommended deployment setup:

- Backend: Render
- Database: Render PostgreSQL
- Environment variables managed via platform dashboard

---

## 🌿 Branching Strategy

We use the following branches:

- `develop` — main development branch
- `feature/*` — feature-specific branches

All features are merged into `develop` via Pull Requests.

---

## 👥 Team Members

👩‍💻 @dzichonka  
[GitHub](https://github.com/dzichonka)

👨‍💻 @DzmitryAliakseyeu  
[GitHub](https://github.com/DzmitryAliakseyeu)

🧑🏼‍💻 @snitkon  
[GitHub](https://github.com/snitkon)

---

## 🎯 Project Goal

The goal of this backend is to practice:

- Building scalable REST APIs with NestJS
- Working with authentication & authorization
- Database design with Prisma
- File upload handling
- Integration with external APIs
- Team collaboration in fullstack development