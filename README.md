# Backend (Node + Express + MongoDB)
## Quick start

### 1) Install dependencies

```bash
cd backend
npm install
```

### 2) Configure environment variables

Create `backend/.env`:

```bash
PORT=8080
MONGODB_URI=mongodb://127.0.0.1:27017/coinbase_clone
JWT_SECRET=replace-me-with-a-long-random-string
CLIENT_ORIGIN=http://localhost:5173
NODE_ENV=development
```

Notes:
- `CLIENT_ORIGIN` must match where Vite serves the frontend.
- Auth uses an **HTTP-only cookie** named `token`.

### 3) Run MongoDB

You can run MongoDB locally (service) or via Docker.

#### Option A: Local MongoDB service

- Ensure MongoDB is installed and running.
- Keep `MONGODB_URI` as shown above.

#### Option B: Docker

```bash
docker run --name coinbase-mongo -d -p 27017:27017 mongo:7
```

Then use:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/coinbase_clone
```

### 4) (Optional) Seed crypto data

```bash
cd backend
npm run seed
```

### 5) Start the backend

```bash
cd backend
npm run dev
```

Backend will run at `http://localhost:8080`.

### 6) Point the frontend at the backend

Create a root `.env` (or update it) in the project root:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

Then start frontend:

```bash
npm run dev
```

## API

- `POST /register` → `{ name, email, password }`
- `POST /login` → `{ email, password }`
- `POST /logout`
- `GET /profile` (requires auth cookie)
- `GET /crypto`
- `GET /crypto/gainers`
- `GET /crypto/new`
- `POST /crypto` (requires auth cookie) → `{ name, symbol, price, image?, change24h }`

