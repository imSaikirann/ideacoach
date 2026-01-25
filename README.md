# IdeaCoach

An AI-powered platform that generates personalized project ideas for developers using Google Gemini AI.

## Features

- 🤖 **AI-Powered Generation**: Uses Google Gemini to create tailored project ideas
- 🎯 **Personalized Suggestions**: Based on project type, tech stack, difficulty, and interests
- 💾 **Save & Share**: Save ideas privately or share them publicly with the community
- 🔍 **Browse Ideas**: Explore public ideas from other developers
- 💳 **Credit System**: Free tier with limited credits, upgrade to Pro for more
- 🎨 **Modern UI**: Clean, responsive design built with Next.js and Tailwind CSS

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB (via Prisma)
- **AI**: Google Gemini
- **Auth**: NextAuth.js
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **UI Components**: Radix UI

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- MongoDB database
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ideacoach
```

2. Install dependencies:
```bash
npm install
# or
bun install
```

3. Set up environment variables:
Create a `.env.local` file:
```env
# Database
DATABASE_URL="your-mongodb-connection-string"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google Gemini
GOOGLE_GENERATIVE_AI_API_KEY="your-gemini-api-key"

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL="your-redis-url"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"
```

4. Set up the database:
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate
```

5. Start the development server:
```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   └── dashboard/         # Dashboard pages
├── components/            # Reusable UI components
├── features/              # Feature modules
│   ├── ideaCoach/        # Idea generation flow
│   └── public-ideas/     # Public ideas browsing
├── lib/                   # Utilities and configurations
│   ├── ai/               # AI generation logic
│   └── prisma.ts         # Prisma client
└── prisma/                # Database schema
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:studio` - Open Prisma Studio

## How It Works

1. **Select Preferences**: Choose project type, tech stack, difficulty, and interests
2. **Add Custom Problem** (optional): Describe a specific problem you want to solve
3. **Generate**: AI creates a personalized project idea with:
   - Problem statement
   - Key features
   - Why it fits you
   - Upgrade paths (beginner/intermediate/advanced)
   - Common mistakes to avoid
   - Interview talking points
   - First things to Google
4. **Save & Share**: Save ideas privately or make them public

## License

Private project
