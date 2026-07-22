# SportsDB

A React + Tailwind CSS app for browsing sports leagues, powered by the [TheSportsDB](https://www.thesportsdb.com/api.php) public API. Search and filter leagues by name or sport, then click a league to view its season badge.

## Running locally

**Prerequisites:** Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build    # production build, output to dist/
npm run preview  # preview the production build locally
npm run lint     # run oxlint
```

No environment variables or API keys are required — the app uses TheSportsDB's free public test key (`3`).

## How it works

- **Fetching leagues** — On load, `useAllLeagues` calls `GET /all_leagues.php` and returns the full list of leagues, each with `idLeague`, `strLeague`, and `strSport`.
- **Search & filter** — `useFilterLeagues` takes that list and derives the unique set of sports for the filter dropdown, and re-filters the list on every keystroke/selection change by league name (case-insensitive substring match) and selected sport.
- **League details (alternate name)** — `all_leagues.php` doesn't return `strLeagueAlternate`. To show it on a league card, `useLeagueDetails` calls `GET /lookupleague.php?id={leagueId}` per league (as referenced in the API docs) and merges in `strLeagueAlternate` once it resolves, with the initial list data shown immediately as a fallback while it loads. Results are cached per league ID so repeated renders don't refetch.
- **Season badge** — Clicking a league card opens `SeasonBadgeModal`. `useBadge` calls `GET /search_all_seasons.php?badge=1&id={leagueId}` (the seasons/badge lookup endpoint) and picks the first season that has a `strBadge` image. Results are cached per league ID.
- **UI states** — Loading and error states are handled at the top level (`Homepage`) for the leagues list, and locally within the modal for the badge fetch.

All API calls share a single `getData` helper ([src/api/baseapi.js](src/api/baseapi.js)) that prefixes requests with the base URL and throws on a non-OK response.

## Project structure

```
src/
├── api/                      # Raw fetch calls to TheSportsDB, one file per endpoint
│   ├── baseapi.js            #   shared getData() helper (base URL + error handling)
│   ├── allleagues.js         #   GET /all_leagues.php
│   ├── leagueDetails.js      #   GET /lookupleague.php
│   └── badges.js             #   GET /search_all_seasons.php?badge=1
├── hooks/                    # Data-fetching hooks (state, loading, error, caching)
│   ├── useAllLeagues.js
│   ├── useLeagueDetails.js
│   ├── useBadge.js
│   └── useFilterLeagues.js   #   client-side search + sport filtering
├── components/
│   ├── SearchBar/
│   ├── FilterDropdown/
│   ├── LeagueList/
│   ├── LeagueCard/           #   fetches its own alternate-name
│   └── SeasonBadgeModal/     #   fetches the season badge on open
├── Screens/
│   └── Homepage/             #   composes the above into the main page
├── constants.js              #   static asset URLs (logo)
├── App.jsx
├── main.jsx
└── index.css                 #   Tailwind entry point + custom theme tokens
```

## Notes

UI styling and layout were built with the help of Claude (Claude Code).
