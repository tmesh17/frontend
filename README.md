# College Score Frontend

Next.js application for the College Score project.

## Quick Start

### Prerequisites

- Node.js 18+ (with npm)
- A running backend server (see backend README)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env.local` file in the frontend directory:

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

This tells the frontend where to find the backend API.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Running with Backend

Both the frontend and backend must run simultaneously in separate terminal windows.

### Terminal 1: Backend

```bash
cd backend/backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
```

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

The frontend will automatically connect to the backend API at `http://127.0.0.1:8000` once both are running.

## Environment Configuration

The following environment variables are available:

- `NEXT_PUBLIC_API_URL` — Backend API URL (default: `http://127.0.0.1:8000`)

These must be prefixed with `NEXT_PUBLIC_` to be accessible in the browser.

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run ESLint
- `npm run format:check` — Check code formatting
- `npm run format:fix` — Fix code formatting
- `npm run type-check` — Check TypeScript types
- `npm test` — Run tests

## Project Structure

```
src/
├── app/               # Next.js app directory (pages, layouts)
├── components/        # Reusable React components
├── lib/              # Utilities and helpers
├── types/            # TypeScript type definitions
└── styles/           # Global and component styles
```

## Tech Stack

- **Framework:** Next.js 16
- **UI Library:** Material-UI (MUI)
- **Styling:** Tailwind CSS + Emotion
- **State Management:** React Hooks
- **API Client:** Fetch API
- **Database:** Supabase (via backend)

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Troubleshooting

**Backend API not connecting?**
- Verify `NEXT_PUBLIC_API_URL` is set correctly in `.env.local`
- Ensure the backend is running on `http://127.0.0.1:8000`
- Check browser console for CORS errors

**Development server not starting?**
- Delete `node_modules` and `.next` directory
- Run `npm install` again
- Restart the dev server

**Port 3001 already in use?**
```bash
kill -9 $(lsof -ti:3001)
```
