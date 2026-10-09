# Food Bridge (React JS + Vite + Tailwind)

Plain React JS (no TypeScript). No backend: data comes from `src/data/mockData.js`,
login/theme/language are kept in the browser's localStorage.

## Run
1. Install Node.js 18 or newer
2. `npm install`
3. `npm run dev`  -> open the link shown in the terminal (e.g. http://localhost:5173)

Demo login: pick a role, enter any 10 digit phone, OTP is `123456`.

## Folders
- `src/pages`      Home, Board, Donor, NGO, Volunteer, Admin, Login
- `src/components` Header, Footer, ListingCard, MapRoute, CountdownTimer, ImpactCounter
- `src/context`    Auth, Language, Nav, Theme
- `src/data`       mockData.js
- `src/utils`      helpers.js

## Note
`package.json` has an `overrides` entry that makes Rollup use its WebAssembly build.
It is there for Windows PCs where Application Control blocks Rollup's native file.
On a normal PC you can delete the `overrides` block for faster builds.
