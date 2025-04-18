# Next.js + Sanity CMS Project

A modern, high-performance website built with Next.js 14 and Sanity CMS.

## Features

- 🚀 **Next.js 14** with App Router
- 📝 **Sanity CMS** for content management
- 🎨 **Tailwind CSS** for styling
- 🔍 **SEO optimized** with dynamic metadata
- 📱 **Fully responsive** design
- 🔄 **ISR** (Incremental Static Regeneration)
- 👀 **Preview Mode** for content editors
- 🔎 **Search functionality**
- 🗺️ **Dynamic sitemap** generation
- 📊 **Analytics** with Vercel Analytics
- 🔒 **TypeScript** for type safety

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   cd studio-stenstudio
   npm install
   cd ..
   \`\`\`

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   \`\`\`
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_TOKEN=your_api_token
   SANITY_PREVIEW_SECRET=your_preview_secret
   REVALIDATION_SECRET=your_revalidation_secret
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   \`\`\`

4. Start the development server:
   \`\`\`bash
   # Run Next.js
   npm run dev
   
   # In another terminal, run Sanity Studio
   npm run studio:dev
   \`\`\`

5. Open [http://localhost:3000](http://localhost:3000) to view the website and [http://localhost:3333](http://localhost:3333) to access Sanity Studio.

## Deployment

### Next.js Frontend

Deploy the Next.js frontend to Vercel:

1. Push your code to GitHub
2. Import the project to Vercel
3. Set up the environment variables in the Vercel dashboard

### Sanity Studio

Deploy Sanity Studio:

\`\`\`bash
cd studio-stenstudio
npx sanity deploy
\`\`\`

## Project Structure

\`\`\`
├── app/                  # Next.js app directory
│   ├── api/              # API routes
│   ├── posts/            # Post pages
│   ├── search/           # Search page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── sitemap.ts        # Sitemap generator
├── components/           # React components
│   ├── portable-text/    # Portable Text components
│   ├── ui/               # UI components
│   └── ...
├── lib/                  # Utility functions
│   ├── sanity.client.ts  # Sanity client
│   ├── sanity.query.ts   # GROQ queries
│   └── ...
├── public/               # Static assets
├── studio-stenstudio/    # Sanity Studio
│   ├── schemas/          # Content schemas
│   ├── desk/             # Desk structure
│   └── ...
├── .env.local            # Environment variables (local)
├── next.config.js        # Next.js configuration
└── tailwind.config.js    # Tailwind CSS configuration
\`\`\`

## Content Management

### Content Types

- **Posts**: Blog posts with rich text content
- **Authors**: Content creators
- **Categories**: Content categorization
- **Homepage**: Main page content

### Sanity Studio

Access the Sanity Studio to manage content at:
- Local: [http://localhost:3333](http://localhost:3333)
- Production: [https://your-project.sanity.studio](https://your-project.sanity.studio)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
\`\`\`

Now, let's create a proper license file:

```text file="LICENSE"
MIT License

Copyright (c) 2024 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
