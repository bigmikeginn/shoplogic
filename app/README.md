# ShopLogic Utility

A comprehensive woodworking tools and calculators suite built as a Progressive Web App (PWA).

## Features

- **Board Feet Calculator**: Calculate board footage for lumber
- **Plywood Planner**: Optimize sheet layouts with guillotine bin-packing
- **Finish Estimator**: Estimate finish quantities for various surfaces
- **Fraction Math**: Fraction arithmetic and decimal/fraction conversion
- **Metric Converter**: Convert between metric and imperial units
- **Wood Database**: Reference database of wood species with properties
- **Joinery Spacer**: Calculate spacing for dovetails, mortises, tenons, and shelf pins
- **Cut List Generator**: Generate optimized cut lists with board footage calculations
- **Wood Movement Calculator**: Estimate seasonal wood expansion and contraction
- **Fastener Calculator**: Pilot hole sizing and fastener recommendations

## Tech Stack

- **Frontend**: React 18 with functional components
- **Styling**: Tailwind CSS 3.3
- **Build Tool**: Vite 5
- **PWA**: Service Worker for offline support + Web App Manifest

## Development

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
The production build will be in the `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

## PWA Features

- **Installable**: Add to home screen on mobile devices
- **Offline Support**: Service Worker caches app assets and provides fallback for offline access
- **Standalone Mode**: Runs as a full-screen app without browser UI
- **Mobile Friendly**: Responsive design optimized for touch input

### Install on Mobile

1. **iOS**: Open in Safari → Share → Add to Home Screen
2. **Android**: Open in Chrome → Menu (⋮) → Install app → Select ShopLogic

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import the GitHub repository
4. Framework: Vite
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click Deploy

The app will be live and installable within seconds!

### Alternative: Deploy to Netlify

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect GitHub repository
4. Build Command: `npm run build`
5. Publish Directory: `dist`
6. Deploy

## Project Structure

```
shoplogic/
├── index.html              # HTML entry point with service worker registration
├── public/
│   ├── manifest.json       # PWA manifest
│   └── service-worker.js   # Offline caching strategy
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Module router
│   ├── index.css           # Tailwind styles
│   ├── components/         # React UI components
│   │   ├── BoardFeet.jsx
│   │   ├── PlywoodPlanner.jsx
│   │   ├── FinishEstimator.jsx
│   │   ├── FractionMath.jsx
│   │   ├── MetricConverter.jsx
│   │   ├── WoodDatabase.jsx
│   │   ├── JoinerySpacing.jsx
│   │   ├── CutListGenerator.jsx
│   │   ├── WoodMovementCalc.jsx
│   │   ├── FastenerCalculator.jsx
│   │   └── SheetVisualization.jsx
│   └── utils/              # Pure utility functions
│       ├── boardFeetCalculator.js
│       ├── binPacker.js
│       ├── finishCalculator.js
│       ├── fractionMath.js
│       ├── fractionParser.js
│       ├── converter.js
│       ├── woodDatabase.js
│       ├── joinerySpacing.js
│       ├── cutListGenerator.js
│       ├── woodMovement.js
│       └── fastenerCalculator.js
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## License

Open source. Free to use and modify for personal or commercial woodworking projects.
