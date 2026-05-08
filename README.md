# TruckerPath Dispatcher OS

Dispatcher-focused Next.js 14 App Router app for route planning, fleet operations, exception management, and assignment workflows.

The product now has three primary surfaces:

- `/` keeps the existing map and route-planning workflow intact.
- `/reports` is the dispatcher HQ dashboard with KPI filtering, urgent actions, smart to-do, fleet map preview, trip/load/driver drill-downs, route comparison, detention handling, safety/compliance, and docs/billing reconciliation.
- `/growth` is the marketplace growth layer for driver onboarding, AI-scored load discovery, booking conversion, partner-signal health, PM Copilot synthesis, and experiment planning.
- `/partner-portal` demonstrates the post-contract NavPro partner lifecycle across contract generation, payout setup, demo account provisioning, referral attribution, payout calculation, partner dashboard, and internal admin monitoring.

`/copilot` no longer exists as a standalone product surface. It now redirects to `/reports`, and the useful CoPilot logic has been folded into the new operations dashboard.

## Stack

- Next.js 14 App Router
- Tailwind CSS 3.4
- Leaflet map stack with existing provider toggle (`osm` or `here`)
- InsForge for operational data
- Gemini via `@ai-sdk/google` for explainability and assistive flows
- Vitest + Playwright for verification

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

The app runs on [http://localhost:3030](http://localhost:3030).

## Environment

| Variable | Purpose |
| --- | --- |
| `NAVPRO_API_BASE_URL` | NavPro API base URL |
| `NAVPRO_API_BEARER_TOKEN` | Server-only NavPro bearer token |
| `NEXT_PUBLIC_INSFORGE_URL` | InsForge project URL |
| `NEXT_PUBLIC_INSFORGE_ANON_KEY` | InsForge anon key |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini API key |
| `GEMINI_MODEL` | Optional Gemini model override. Defaults to `gemini-2.5-flash-lite` |
| `NEXT_PUBLIC_MAP_PROVIDER` | `osm` or `here` |
| `NEXT_PUBLIC_HERE_API_KEY` | HERE tile key when using HERE tiles |

## Demo vs Live

The dispatcher dashboard is intentionally demo-first when the expanded InsForge schema is not available yet.

- `Live mode` is used when InsForge is configured and the backing schema/data are present.
- `Demo mode` is used when the live stack is missing or incomplete. The UI keeps the same contracts and behavior, and interactions persist locally in browser storage so the dashboard remains fully interactive.

Current implementation details:

- `/reports` fetches the dispatcher HQ contract from `/api/dispatcher-hq`.
- The returned snapshot is seeded with realistic scenario data for loads, drivers, trips, alerts, docs, detention, repair, and last-mile guidance.
- Task completion, alert acknowledgement, document review state, and demo assignments persist locally.
- The dashboard UI clearly labels demo/live state and last refresh timestamp.

## Key Workflow

The main dispatch workflow is:

1. Open `/reports`.
2. Use the KPI strip, urgent action band, or smart to-do board to find the next operational issue.
3. Open a load from the load board and choose `Assign driver`.
4. The app navigates to `/` with dispatch context in the URL.
5. On the map page, route options are calculated using the existing route-planning flow.
6. After a route is chosen, ranked drivers appear in dispatch mode with deterministic readiness scoring.
7. Assigning a driver writes the result back to the shared demo state and returns the dispatcher to an immediately updated Reports dashboard.

This keeps a single route-planning product instead of creating a second planner inside Reports.

## Marketplace Growth Layer

The `/growth` route reframes the Dispatcher OS for the AI-Native Product Management Intern role. It adds a product-growth view across driver onboarding, AI-scored load discovery, booking conversion, marketplace integration signals, and activation -> conversion -> retention experiments.

This layer is demo-first and uses seeded data. The LoadPilot scoring engine is deterministic, while AI is used only for explainability and PM workflow acceleration. Gemini is optional; when no API key is configured, the PM Copilot uses a deterministic fallback so the demo remains fully usable without live APIs, database migrations, auth, or new environment variables.

Recommended demo path:

1. Open `/growth`.
2. Adjust the onboarding profile to show how preferences affect load ranking.
3. Select a load and review the LoadPilot explanation, positive signals, and risks.
4. Save the load and request booking to simulate conversion.
5. Review the booking funnel, marketplace integrations, PM Copilot output, and experiment backlog.

## Partner Portal UX Flow

The `/partner-portal` route demonstrates a post-contract NavPro partner lifecycle for a GTM Engineering interview case. The flow breaks the seven required portal responsibilities into separate screens: contract generation, Stripe Connect payout setup, NavPro demo account provisioning, referral attribution, payout calculation, partner dashboard, and internal admin monitoring.

This is UX-first and demo-first. All data is mocked. No live DocuSign, Stripe, HubSpot, or NavPro API integration is required. The global `Partners` tab first opens `/partner-portal/partners`, where agreed Acme terms are saved before the post-contract lifecycle begins.

## Schema and Seed Data

The expanded schema lives in [schema.sql](/C:/Users/sidds/OneDrive/Documents/GitHub/TruckerPath/schema.sql).

It extends the original model with dispatcher OS entities including:

- `vehicles`
- `trips`
- `trip_stops`
- `trip_events`
- `route_plans`
- `route_options`
- `driver_readiness_scores`
- `hos_snapshots`
- `eld_events`
- `maintenance_events`
- `repair_shops`
- `repair_estimates`
- `driver_incidents`
- `safety_scores`
- `compliance_events`
- `law_change_alerts`
- `road_condition_alerts`
- `market_alerts`
- `dispatcher_tasks`
- `ai_recommendations`
- `driver_notifications`
- `dispatcher_notifications`
- `document_requirements`
- `load_documents`
- `invoice_drafts`
- `invoice_reconciliation`
- `detention_invoice_drafts`
- `customer_notifications`
- `facility_entry_points`
- `facility_entry_images`
- `fuel_partner_locations`
- `fuel_price_snapshots`
- `downstream_load_links`
- `assignment_audit_log`

The seed section includes the named scenario pack coverage used by the new Reports experience, including Patel urgent assignment, Ramirez fuel/HOS pressure, Nguyen delay, Chen ELD issue, Williams billing blocker, Martinez breakdown, Okafor relay, Reed downstream tradeoff, excessive detention, law-change alerting, market surge, and last-mile entrance guidance.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm test
npm run test:browser
```

## Verification

The implementation was validated with:

```bash
npm run build
npm test
npm run test:browser
```

## Project Notes

- Tailwind stays on `3.4.x`.
- The map tab remains the full route-planning workspace.
- The Reports dashboard uses production-shaped states: loading, empty, error, demo/live, drill-downs, and inline actions.
- Gemini enhances explanations and prioritization, but deterministic scoring and route gating remain the source of truth.
- Seeded last-mile image references live under [`public/facilities`](/C:/Users/sidds/OneDrive/Documents/GitHub/TruckerPath/public/facilities).
