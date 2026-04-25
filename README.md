<div align="center">

# 👥 TeamHub

**A minimal, full-stack team management web app.**

Built with React · Node.js · Express · MongoDB

[![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-local-47A248?logo=mongodb&logoColor=white)](https://mongodb.com/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

</div>

---

## ✨ Features

- 📋 **Add Members** — Name, role, email, and optional profile photo
- 👁 **View Team** — Card grid with role badges and avatar initials fallback
- 🔍 **Member Profiles** — Full detail page with join date and email link
- ⚡ **Fast UX** — Skeleton loaders, abort controllers, lazy images
- 🎨 **Minimal Dark UI** — Inter font, glassmorphism navbar, smooth transitions

---

## 🗂 Project Structure

```
teamhub/
├── backend/                # Express + MongoDB API
│   ├── models/
│   │   └── Member.js       # Mongoose schema
│   ├── routes/
│   │   └── memberRoutes.js # REST endpoints
│   ├── uploads/            # Uploaded profile photos (auto-created)
│   ├── server.js           # Entry point
│   └── package.json
│
└── frontend/
    └── frontend/           # React app (CRA)
        ├── src/
        │   ├── components/
        │   │   └── Navbar.js
        │   ├── pages/
        │   │   ├── Home.js
        │   │   ├── AddMembers.js
        │   │   ├── ViewMembers.js
        │   │   └── MemberDetails.js
        │   ├── App.js
        │   └── index.css   # Full design system
        ├── .env.example
        └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18+ | [nodejs.org](https://nodejs.org/) |
| npm | 9+ | Bundled with Node |
| MongoDB | 6+ | [mongodb.com](https://www.mongodb.com/try/download/community) |

> MongoDB must be running locally on the default port `27017`.

---

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/teamhub.git
cd teamhub
```

---

### 2. Backend Setup

```bash
cd backend
npm install
node server.js
```

The API will be live at: **http://localhost:5000**

---

### 3. Frontend Setup

Open a **second terminal window:**

```bash
cd frontend/frontend
npm install
npm start
```

The app will open at: **http://localhost:3000**

---

### 4. Environment Variables

The frontend uses a `.env` file. Create one if it doesn't exist:

```bash
# frontend/frontend/.env
REACT_APP_API_URL=http://localhost:5000
```

> An `.env.example` file is included in the repo for reference.

---

## 🌐 API Reference

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/members` | Get all team members |
| `GET` | `/members/:id` | Get a single member by ID |
| `POST` | `/members` | Add a new member (multipart/form-data) |

### POST `/api/members` — Body (form-data)

| Field | Type | Required |
|-------|------|----------|
| `name` | string | ✅ |
| `role` | string | ✅ |
| `email` | string | ✅ |
| `image` | file | ❌ (optional) |

---

## 🖼 Screenshots

> Run the app locally to see the live UI.

| Page | Description |
|------|-------------|
| **Home** | Hero landing with CTAs |
| **Add Member** | Clean form with file upload |
| **Members** | Responsive card grid |
| **Profile** | Full member detail view |

---

## 🛠 Tech Stack

### Frontend
- [React 19](https://react.dev/) — UI framework
- [React Router v7](https://reactrouter.com/) — Client-side routing
- [Axios](https://axios-http.com/) — HTTP requests
- Vanilla CSS — Custom design system (no Tailwind, no UI lib)

### Backend
- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/) — REST API
- [Mongoose](https://mongoosejs.com/) — MongoDB ODM
- [Multer](https://github.com/expressjs/multer) — File/image upload handling
- [CORS](https://www.npmjs.com/package/cors) — Cross-origin resource sharing

### Database
- [MongoDB](https://mongodb.com/) — Local NoSQL database (`teamDB`)

---

## ⚙️ Scripts

### Backend

| Command | Description |
|---------|-------------|
| `node server.js` | Start the API server |
| `nodemon server.js` | Start with auto-reload (install nodemon first) |

### Frontend

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server at :3000 |
| `npm run build` | Build for production |
| `npm test` | Run tests |

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
Made with ❤️ using React & Node.js
</div>
