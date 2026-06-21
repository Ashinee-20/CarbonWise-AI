# CarbonWise AI

CarbonWise AI is a production-ready Next.js 15 web application that helps individuals understand, track, and reduce their carbon footprint through daily logging, analytics, gamification, and context-aware sustainability coaching.

## Problem Statement

Design a solution that helps individuals understand, track, and reduce their carbon footprint through simple actions and personalized insights. CarbonWise AI turns transportation, food, electricity, and shopping habits into understandable carbon metrics, practical actions, future forecasts, and a "Carbon Twin" annual projection.

## Chosen Vertical

Personal climate action and sustainable lifestyle management.

## Architecture

```text
Browser
  |-- Dashboard, activity logger, analytics, gamification
  |-- Local browser storage for private activity history
  |
Next.js App Router
  |-- Server components and client components
  |-- API routes: /api/footprint, /api/coach, /api/forecast
  |
Service Layer
  |-- carbon/coach.ts
  |-- carbon/agents.ts
  |-- carbon/analytics.ts
  |-- carbon/calculator.ts
  |-- carbon/recommendations.ts
  |-- carbon/forecast.ts
  |-- api/activity-request.ts
  |
Security Layer
  |-- Zod validation
  |-- payload sanitization
  |-- in-memory API rate limiting
  |
Google Cloud
  |-- Cloud Run single URL hosting frontend and backend
  |-- Artifact Registry container images
  |-- Cloud Build deployment pipeline
```

## Features

- Personal carbon footprint dashboard with sustainability score
- Daily activity logging for transportation, food, electricity, and shopping
- Category-wise footprint calculation and breakdown
- Weekly trend chart and monthly comparison metrics
- AI Sustainability Coach with personalized recommendations and action plans
- Specialist coach agents for mobility, food, electricity, shopping, and overall footprint
- Personalized AI assistant summary with focus areas and next steps
- Daily eco-friendly challenges and reward points
- Future footprint forecasting
- Carbon Twin projected annual emissions
- Historical weekly and monthly comparison
- Achievement badges and daily streaks
- Responsive, keyboard-friendly, accessible UI

## Technical Decisions

- Next.js 15 App Router keeps frontend and backend on one deployed URL.
- TypeScript strict mode provides strong typing across domain, API, and UI code.
- Service layer separates carbon calculations, recommendations, forecasting, validation, and security helpers.
- Agent orchestration is deterministic and testable: specialist agents inspect category behavior, rank priorities, and feed the AI coach response.
- Browser localStorage is used for the prototype's private personal history while same-origin API routes perform validated calculations.
- Dynamic chart loading reduces initial rendering work.
- Custom lightweight SVG charts avoid heavy visualization dependencies.

## Security Measures

- Zod validates all API payloads and numeric ranges.
- Incoming text and object keys are sanitized before processing.
- API routes use same-origin JSON handling and return structured errors.
- Basic in-memory IP-aware rate limiting protects API routes.
- Security headers are configured in `next.config.ts`.
- No secrets are committed. Runtime configuration belongs in `.env`, based on `.env.example`.
- UI renders user inputs as React values, preventing raw HTML injection.
- The AI assistant and coach logic remain deterministic and auditable to ensure responsible recommendations.

## Testing Strategy

The project includes meaningful example coverage with Vitest:

- Unit tests for emissions calculation and scoring
- Agent orchestration, historical comparison, recommendations, forecasting, and coach response tests
- Validation tests for accepted and rejected activity payloads
- API request parsing tests for malformed JSON and valid payloads
- Utility tests for sanitization
- Component tests for activity submission and accessible metric rendering

Run:

```bash
npm test
npm run typecheck
npm run build
```

## Accessibility Considerations

- Semantic regions, headings, forms, fieldsets, labels, and navigation
- Skip link for keyboard users
- Visible focus states
- ARIA labels for charts and status updates
- WCAG-conscious contrast with restrained color usage
- Reduced-motion support
- Buttons and form controls are keyboard operable

## Installation

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

## Deployment on Google Cloud

CarbonWise AI is designed for Google Cloud Run so the Next.js frontend and API backend share one HTTPS URL.

1. Enable required Google services:

```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
```

2. Create an Artifact Registry repository:

```bash
gcloud artifacts repositories create carbonwise --repository-format=docker --location=us-central1
```

3. Deploy with Cloud Build:

```bash
gcloud builds submit --config cloudbuild.yaml
```

4. Get the deployed URL:

```bash
gcloud run services describe carbonwise-ai --region us-central1 --format="value(status.url)"
```

## Environment Variables

See `.env.example`.

`RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX_REQUESTS` configure API protection. Google Cloud project variables are included for future Vertex AI integration while the current app uses deterministic, auditable coaching logic.

## Assumptions Made

- Carbon factors are practical estimates suitable for personal guidance, not regulatory reporting.
- User history remains local to the browser for privacy in this hackathon-ready version.
- AI coaching is implemented as deterministic expert logic for reliability, cost control, and transparent recommendations.
- The app deploys to Cloud Run as a single container serving both UI and API routes.

## Future Improvements

- Add Google Firestore user accounts and cloud sync
- Integrate Vertex AI Gemini for natural-language coaching with tool-grounded calculation outputs
- Add OAuth through Google Identity Platform
- Support location-aware electricity grid factors
- Add CSV import/export and household profiles
- Add Playwright end-to-end tests and Lighthouse CI
