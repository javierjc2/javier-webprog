# Javier Web App — Lab 7 (MERN Stack)

## Project Structure

```
javier-webprogLab7/
├── javier-client/   ← React + Vite frontend
└── javier-server/   ← Express + MongoDB backend
```

---

## 1 — MongoDB Atlas Setup

1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas) → create a free cluster
2. **Database Access** → Add a database user (username + password)
3. **Network Access** → Add IP `0.0.0.0/0` (allow all — required for Vercel)
4. **Connect** → Drivers → copy the connection string:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/javier-db?retryWrites=true&w=majority
   ```

---

## 2 — Backend Setup & Seed

```bash
cd javier-server
cp .env.example .env          # fill in your MONGO_URI and a strong JWT_SECRET
npm install
node seed.js                  # seeds users + articles into Atlas
npm run dev                   # starts on http://localhost:8000
```

**Test accounts after seeding:**

| Role   | Email                        | Password   | Can log in? |
|--------|------------------------------|------------|-------------|
| Admin  | alicia.reyes@javier.dev      | Alicia123! | ✅          |
| Editor | bianca.cruz@javier.dev       | Bianca123! | ❌ inactive |
| Viewer | marco.santos@javier.dev      | Marco123!  | ❌ blocked  |

---

## 3 — Frontend Setup

```bash
cd javier-client
cp .env.example .env          # VITE_API_URL=http://localhost:8000/api
npm install
npm run dev                   # starts on http://localhost:5173
```

---

## 4 — Deploy Backend to Vercel

1. Push `javier-server/` to its own GitHub repo (or a subfolder)
2. [vercel.com](https://vercel.com) → New Project → import the repo
3. **Root Directory** → `javier-server`
4. **Environment Variables** (add all three):
   - `MONGO_URI` — your Atlas connection string
   - `JWT_SECRET` — any long random string
   - `NODE_ENV` — `production`
   - `ALLOWED_ORIGIN` — your frontend Vercel URL (e.g. `https://javier-client.vercel.app`)
5. Deploy → copy the backend URL (e.g. `https://javier-server.vercel.app`)

---

## 5 — Deploy Frontend to Vercel

1. Push `javier-client/` to its own GitHub repo (or subfolder)
2. Vercel → New Project → import the repo
3. **Root Directory** → `javier-client`
4. **Build Command** → `npm run build`
5. **Output Directory** → `dist`
6. **Environment Variables**:
   - `VITE_API_URL` → `https://javier-server.vercel.app/api`
7. Deploy ✅

---

## API Endpoints

| Method | Endpoint                    | Auth     | Description          |
|--------|-----------------------------|----------|----------------------|
| POST   | /api/users/login            | Public   | Login                |
| GET    | /api/users                  | Bearer   | Get all users        |
| POST   | /api/users                  | Bearer   | Create user          |
| PUT    | /api/users/:id              | Bearer   | Update user          |
| DELETE | /api/users/:id              | Bearer   | Delete user          |
| PATCH  | /api/users/:id/toggle       | Bearer   | Toggle active status |
| GET    | /api/articles               | Public   | Get all articles     |
| POST   | /api/articles               | Bearer   | Create article       |
| PUT    | /api/articles/:id           | Bearer   | Update article       |
| DELETE | /api/articles/:id           | Bearer   | Delete article       |
| PATCH  | /api/articles/:id/toggle    | Bearer   | Toggle active status |

---

## Lab 7 Enhancements

- **Enhancement 1** — Viewers blocked at `/api/users/login` (403). Editors see an access-denied screen on `/dashboard/users`.
- **Enhancement 2** — `/dashboard/articles` — full CRUD DataGrid for articles, pulled from MongoDB.
- **Enhancement 3** — `/auth/signup` — creates a real user in MongoDB via `POST /api/users`, then auto-logs in.
