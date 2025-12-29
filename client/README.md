# Portfolio (Vite + React + TypeScript + Tailwind)

A modern, multi-theme developer portfolio built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui. Showcases projects, skills, coding achievements, and more with beautiful UI and smooth animations.

## Features

- ⚡️ Fast Vite build with React 18
- 🎨 Multi-theme support (light/dark)
- 🧩 Modular, reusable components (shadcn/ui, Radix UI)
- 📊 Coding stats from LeetCode, Codeforces, CodeChef, GFG (API integration)
- 📱 Responsive, mobile-friendly design
- 🌈 Tailwind CSS for rapid styling
- 🧑‍💻 TypeScript for type safety
- 🧹 Linting with ESLint
- 🔒 Accessible and keyboard-friendly

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## Project Structure

- `src/` — Main source code
  - `components/` — UI and layout components
  - `pages/` — Main pages (About, Projects, Skills, etc.)
  - `data/` — Portfolio data (skills, projects, achievements)
  - `services/` — API integrations
  - `styles/` — Custom CSS and Tailwind config

## Customization

- Update your info in `src/data/*.ts`
- Add/edit projects, skills, and achievements
- Customize themes in `tailwind.config.ts` and CSS files

## Linting

```bash
npm run lint
```

## Credits

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

## License

MIT
