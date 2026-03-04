# THE AGGREGATE CMS

CMS for creating, managing, and publishing music-related articles. Built with MERN stack to power editorial workflows for a music website, supporting rich content, lists, slides, and more.

## Demo

Access the live demo at [https://aggregate-cms.onrender.com/](https://aggregate-cms.onrender.com/)
  
> **Note:** For admin/demo credentials, contact [daveclydesdale@gmail.com](mailto:daveclydesdale@gmail.com).



## Features

- **Article Creation & Editing**: Create articles of type `standard`, `list`, or `slides` with rich text, images, and custom blocks.
- **Music-Focused Metadata**: Tag articles with genres, artists, and music-specific keywords.
- **External RSS Feed Integration**: Register external RSS feeds as sources. Use imported feed items as the basis for new, original articles — ideal for music news aggregation and editorial enrichment.
- **Hero & Highlighted Articles**: Pin feature articles for homepage carousels and hero sections.
- **List & Slide Articles**: Build ranked lists (e.g., top albums) and slideshows for visual storytelling.
- **Author Management**: Assign display authors, manage user roles (admin, client, guest, author).
- **Publishing Workflow**: Draft, edit, and publish articles. Mark as featured or primary for special display.
- **Dashboard**: Admin dashboard for managing articles, users, page configs, and deployments.
- **Queue System**: Queue articles for review before publishing.
- **Tag & Source Management**: Add tags, source URLs, and images to articles.
- **Recent & Filtered Articles**: Fetch recent, highlighted, or filtered articles by tags/text.


## Tech Stack

- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Frontend**: React, TypeScript, Tailwind CSS
- **API**: RESTful endpoints for articles, users, uploads, config, and more

## Article Model

Articles support:
- Title, caption, content (HTML/raw)
- Author & display author
- Tags (genre, artist, etc.)
- Images, source URL
- Published/featured flags
- List items & slide items (for lists/slides)

## Creating an Article

1. Go to the Dashboard and click "Create New Article".
2. Choose type: Standard, List, or Slides.
3. Fill in title, caption, tags, image, and content blocks.
4. Assign author and set publish/feature flags.
5. Save to queue or publish directly.

## Managing Articles

- Edit, update, or delete articles from the dashboard.
- Filter/search by tags, text, or highlight status.
- Pin articles as hero/featured for homepage display.
- Manage lists/slides for ranked or visual content.

## API Endpoints

- `/api/article` - CRUD for articles
- `/api/article/search/tags` - Filter by tags
- `/api/article/search/text` - Search by text
- `/api/article/recent` - Get recent articles
- `/api/article/highlight/:type` - Get highlighted articles
- `/api/user/*` - User management
- `/api/config` - Page and hero config

## Running Locally

1. Install dependencies:
   - `npm install` (root and client folders)
2. Start backend:
   - `node server.js`
3. Start frontend:
   - `cd client && npm start`
4. Access dashboard at [http://localhost:3000](http://localhost:3000)

## Customization

- Add new article types or blocks in `/client/src/types/article.d.ts` and `/schema/article.js`.
- Update dashboard UI in `/client/src/pages/home/dashboard/`.
- Configure hero/featured logic in `/client/src/pages/home/dashboard/components/page-config/hero-articles-config/`.

## Music-Specific Features

- Tagging by genre, artist, era
- Source attribution for music news
- List/slideshow support for rankings, album reviews
- Author/role management for editorial teams

## Data Model Example

```js
{
  type: "standard",
  title: "AllMusic's Favorite Actually Scary Albums",
  caption: "A look at the scariest albums in music history",
  content: "<p>...</p>",
  imgUrl: "...",
  tags: ["horror", "rock", "album"],
  source: "web",
  sourceUrl: "https://...",
  author: "...",
  published: true,
  highlight: ["primary"],
  slideItems: [...],
  listItems: [...],
}
```

## License

MIT
