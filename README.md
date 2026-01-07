# Collaborative Recipe Book 🍳

A social cooking experience platform with minimal friction, featuring real-time collaboration, voice control, and intelligent ingredient management.

## Features

- **Ingredient Scaling Calculator** - Easily scale recipes from 2 servings to 8 or any number
- **Step-by-Step Cooking Mode** - Hands-free voice control for cooking
- **Ingredient Substitutions** - Smart suggestions for missing ingredients
- **Shared Grocery Lists** - Real-time sync across users
- **Photo Upload Flow** - Automatic cropping and filters for recipe photos

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Real-time**: WebSockets (Socket.IO)
- **Voice Control**: Web Speech Recognition API
- **Image Processing**: Sharp
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/              # Next.js app router pages
├── components/       # React components
├── lib/             # Utility functions and configurations
├── public/          # Static assets
└── server/          # WebSocket server
```

## Development Timeline

Estimated: 1-2 months

## License

MIT
