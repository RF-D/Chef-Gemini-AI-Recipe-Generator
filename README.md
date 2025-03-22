# Chef Gemini AI Recipe Generator

An AI-powered recipe generator that creates recipes based on the ingredients you have available.

## Getting Started

### API Key Setup
1. Rename `.env.example` to `.env`
2. Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/)
3. Add your API key to the `.env` file: `VITE_GEMINI_API_KEY=your_key_here`

### Installation and Running
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

## Technologies
- React
- Vite
- Google Generative AI (Gemini 2.0 Flash model)
- React Markdown
