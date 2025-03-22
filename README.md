# Chef Gemini AI Recipe Generator

An AI-powered recipe generator that creates recipes based on the ingredients you have available.

## Getting Started

### Setup
1. Rename `.env.example` to `.env`
2. Set `VITE_WORKER_URL` in the `.env` file to point to your deployed Cloudflare Worker or local Worker development server

### Cloudflare Worker Setup
The application uses a Cloudflare Worker to proxy requests to the Gemini API, keeping API keys secure.

1. Navigate to the `gemini-api-worker` directory
2. Install dependencies with `npm install`
3. Add your Gemini API key as a secret:
   ```
   npx wrangler secret put GEMINI_API_KEY
   ```
4. For local development, run: `npm run dev`
5. For production, deploy with: `npm run deploy`

### Application Setup
```
npm install
npm run dev
```

The app will be available at http://localhost:5173 (or the port shown in your terminal)

### Production Build
```
npm run build
npm run preview
```

## Features
- Enter ingredients you have on hand
- Get AI-generated recipes using Google's Gemini 2.0 Flash model
- Beautifully formatted recipe display with Markdown support
- Secure architecture with API keys stored on the server side

## Technologies
- React
- Vite
- Google Generative AI (Gemini 2.0 Flash model)
- Cloudflare Workers
- React Markdown
