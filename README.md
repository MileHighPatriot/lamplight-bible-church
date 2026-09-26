# Lamplight Bible Church (concept)

A portfolio concept site by [5280 Web Solutions](https://5280webs.com): a fictional non-denominational Bible church in Greenwood Village, Colorado, that teaches verse by verse. People, groups, events, budget figures and phone numbers (555-01xx) are illustrative.

## Features
- **This week** hero card: live countdown to the next streamed service, and a "Live now" state (Denver time)
- **Through the Bible** (`/teaching`): a 66-book bookshelf filled by how much of each book has been taught, a passage finder, and a book-by-book archive of 1,000+ messages with the passage text (World English Bible via bible-api.com) and read-aloud
- **Plan a visit** (`/visit`): four questions → a personal Sunday timeline, kids rooms by age, a greeter request and an .ics file
- **Watch** (`/watch`): live player frame with countdown, fill-in-the-blank sermon notes saved on the device, printable
- **Groups** (`/groups`): home group finder by area, day, and stage of life
- **Kids & Students** (`/next-gen`): rooms and ratios, check-in and safety policies, and this Sunday's passage by age with questions for the drive home
- **Read with us** (`/read`): 12-week reading plan tied to the teaching, with a streak and the passage text inline
- **What we believe** (`/beliefs`): statement of faith where every reference opens the verses in place
- **Events** (`/events`): filterable calendar, .ics per event, signups; **Give** (`/give`): Church Center–style demo form, fee coverage, budget breakdown; **Prayer** (`/prayer`)
- Snow-closure banner driven by Open-Meteo snowfall on service days (preview with `?snow=1`)

## Develop
```bash
npm install
npm run dev
```

## Publish (GitHub Pages)
`npm run pages` builds a static export into `docs/`. GitHub Pages serves `docs/` on `main` at https://lamplight.5280webs.com (`public/CNAME` sets the domain).

Church details live in `data/site.ts`; content in `data/*.ts`.

Photos are public domain (CC0) from StockSnap; sources are in `photos-src/SOURCES.json`. Scripture quotations are from the World English Bible (public domain).
