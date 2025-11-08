X/Twitter Video Downloader
A modern, SEO-optimized web application for downloading videos from X (Twitter) in HD quality.

Overview
This is a full-stack JavaScript application that allows users to download videos from X/Twitter by simply pasting a video URL. The application features a beautiful, responsive UI built with React and Tailwind CSS, and a secure backend API built with Express.js.

Features
User-Facing Features
Video Download: Paste any X/Twitter video URL and download it in multiple quality options (360p, 720p, 1080p)
HD Quality Preservation: Original video quality is maintained with multiple resolution options
Mobile Responsive: Works perfectly on all devices - desktop, tablet, and mobile
Dark Mode: Toggle between light and dark themes
No Registration Required: Start downloading immediately without creating an account
Completely Free: No hidden costs, subscriptions, or download limits
Technical Features
Backend API Integration: Secure integration with external Twitter video extraction API
Analytics Tracking: Track downloads, page views, and user engagement
Google Analytics 4: Comprehensive analytics integration for monitoring usage
SEO Optimized: Complete meta tags, Open Graph tags, and Schema.org markup
Error Handling: Robust error handling with user-friendly messages
TypeScript: Full type safety across frontend and backend
Architecture
Frontend
Framework: React with TypeScript
Routing: Wouter for client-side routing
Styling: Tailwind CSS with custom design system
UI Components: Shadcn/ui component library
State Management: React Query for server state
Forms: React Hook Form with Zod validation
Backend
Framework: Express.js with TypeScript
Validation: Zod schemas for request validation
Storage: In-memory storage (MemStorage) for analytics data
External API: Integration with Twitter video extraction service
Error Handling: Comprehensive error handling and logging
Key Files
client/src/pages/Home.tsx - Main landing page with video downloader
client/src/components/VideoDownloader.tsx - Video URL input and extraction
client/src/components/VideoPreview.tsx - Video preview with download options
server/routes.ts - API routes for video extraction and analytics
server/storage.ts - Analytics data storage interface
shared/schema.ts - Shared TypeScript types and Zod schemas
Environment Variables
The application requires the following environment variables:

Required
TWITTER_API_KEY - API key for Twitter video extraction service (provided by user)
SESSION_SECRET - Secret key for session management
Optional
VITE_GA_MEASUREMENT_ID - Google Analytics 4 measurement ID
TWITTER_API_URL - Twitter API endpoint (defaults to provided service)
Setup Instructions
Install Dependencies:

npm install
Configure Secrets: Add the following secrets in Replit Secrets:

TWITTER_API_KEY: XvApImAssUmAhmED1997rfgD (or your API key)
SESSION_SECRET: Generate a random string
VITE_GA_MEASUREMENT_ID: Your Google Analytics 4 measurement ID (optional)
Run Development Server:

npm run dev
The application will be available at the Replit webview URL.

API Endpoints
POST /api/extract-video
Extract video download links from a Twitter/X URL.

Request Body:

{
  "url": "https://x.com/username/status/1234567890"
}
Response:

{
  "status": "success",
  "tweetId": "1234567890",
  "tweetUrl": "https://x.com/username/status/1234567890",
  "videoUrls": ["https://video.url/720p.mp4", "https://video.url/480p.mp4"],
  "highestQuality": "https://video.url/720p.mp4",
  "thumbnail": "https://thumbnail.url/image.jpg",
  "totalVariants": 2
}
POST /api/track-download
Track a video download for analytics.

Request Body:

{
  "tweetId": "1234567890",
  "tweetUrl": "https://x.com/username/status/1234567890",
  "quality": "720p"
}
GET /api/stats
Get download statistics.

Response:

{
  "totalDownloads": 1250,
  "downloadsToday": 45,
  "downloadsThisWeek": 289,
  "downloadsThisMonth": 1125
}
GET /api/recent-downloads
Get recent downloads.

Query Parameters:

limit (optional): Number of downloads to return (default: 10)
Security Considerations
API keys are stored in environment variables, never in source code
User data is not stored permanently (in-memory storage only)
No personal information is collected
Rate limiting should be implemented for production use
HTTPS should be used for all production deployments
SEO Features
Dynamic meta tags (title, description, keywords)
Open Graph tags for social media sharing
Twitter Card tags
Schema.org markup for rich search results
Semantic HTML structure
Fast page load optimization
Mobile-first responsive design
Google Analytics Integration
The application tracks the following events:

Page views
Video extraction attempts
Video downloads (with quality)
Error occurrences
Share button clicks
Future Enhancements
Admin dashboard for viewing analytics
User authentication for saved downloads
Download history for authenticated users
Database persistence (PostgreSQL) instead of in-memory storage
Rate limiting and abuse prevention
Custom domain support
Multiple language support
Batch video downloads
Video preview player
Download progress indicator
Development
Project Structure
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utility functions
│   │   └── hooks/         # Custom React hooks
│   └── index.html         # HTML template with SEO tags
├── server/                # Backend Express application
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage interface
│   └── index.ts           # Server entry point
├── shared/                # Shared code between frontend and backend
│   └── schema.ts          # TypeScript types and Zod schemas
└── design_guidelines.md   # UI/UX design guidelines
Design System
The application uses a custom design system with:

Consistent spacing (4px, 8px, 12px, 16px, 24px)
Color palette optimized for light and dark modes
Typography scale using Inter font family
Tailwind CSS utility classes
Shadcn/ui component library
See design_guidelines.md for detailed design specifications.

Contributing
This is a personal project, but suggestions and improvements are welcome.

License
All rights reserved. This tool is not affiliated with X Corp or Twitter, Inc.

Disclaimer
This tool is for educational purposes. Users are responsible for ensuring their use complies with X/Twitter's Terms of Service and applicable laws.