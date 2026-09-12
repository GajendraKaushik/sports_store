# Sports Store Back End

Modular `Node.js + Express.js + MongoDB` backend for the Sports Store frontend
(`../sports-store-front-end`).

> Full architecture, data model, API contracts, and task plan live in
> `../project-plan/BACKEND_ARCHITECTURE_PLAN.md`.

## Status

- T01 done: repo metadata only (`package.json`, `.gitignore`, README).
- No application code yet (starts at T03+).

## Setup (placeholder — wired from T04/T05 onward)

```bash
npm install
cp .env.example .env   # coming in T04
npm run dev            # nodemon src/server.js (coming in T05)
```

## Scripts

| Script       | What it runs      |
| ------------ | ----------------- |
| `npm run dev`   | `nodemon src/server.js` |
| `npm start`     | `node src/server.js`    |
| `npm test`      | `vitest run`            |
| `npm run test:watch` | `vitest`           |
| `npm run lint`  | `eslint .`              |
