# Quick start


1. Copy `.env.example` to `.env` and set `JWT_SECRET`.
2. Install dependencies: `npm install`.
3. Run migrations (creates sqlite file): `npm run migrate`.
4. Start server: `npm run dev` (dev) or `npm start`.


Endpoints:
- `POST /auth/register` {name,email,password}
- `POST /auth/login` {email,password}
- `POST /items` (authenticated, multipart/form-data with `file`)
- `GET /items`


Notes:
- Swap SQLite for Postgres in `src/models/index.js` by changing Sequelize config.
- Add rate limiting, helmet, and stronger logging for production.