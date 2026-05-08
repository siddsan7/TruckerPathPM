# TruckerPath Marketplace Growth Layer

## Problem Statement

Drivers and small fleet operators need more than a list of available loads. Gross payout hides deadhead, fuel, parking, HOS, broker, route, document, and return-load risk. The `/growth` route turns those fragmented signals into a demo-ready product-growth layer that helps a driver decide which load is worth taking and helps a PM understand how marketplace activation, conversion, and retention can improve.

## Target Users

- Owner-operator / carrier driver: wants profitable, feasible loads without comparing scattered signals.
- Dispatcher / small fleet operator: wants a quick way to compare load quality and risk.
- AI-native PM / growth intern: wants to synthesize feedback, define experiments, and connect product behavior to marketplace outcomes.
- Partnerships / operations teammate: wants visibility into which integration signals power marketplace quality.

## MVP Features

- Growth KPI strip for onboarding completion, recommendation CTR, booking request rate, and 7-day retention.
- Driver onboarding card with truck type, HOS, deadhead, rate, region, fuel, and parking preferences.
- AI-scored load discovery using deterministic LoadPilot scoring.
- Load detail explanation panel with score breakdown, positive signals, and risks.
- Booking funnel simulator from onboarding started to booking confirmed.
- Marketplace integrations panel for load board, fuel, parking, routing, broker, document, and HOS signals.
- PM Copilot that turns driver feedback into insight, pain point, experiment, hypothesis, metrics, and a PRD draft.
- Experiment backlog for activation, conversion, and retention bets.

## KPIs

- Activation: onboarding started, onboarding completed, first load search, first AI recommendation viewed, first saved load.
- Conversion: load details opened, load saved, booking requested, booking confirmed.
- Retention: 7-day return rate, repeat search rate, repeat booking rate, drivers with 3+ weekly sessions.
- Marketplace quality: average LoadPilot Score, recommendation CTR, high-risk load avoidance, net-profit estimate confidence, partner integration health.

## Experiment Backlog

- Net Profit on Load Cards: test whether net estimate improves booking request conversion.
- Parking Risk Badge: test whether risk visibility increases trust and load detail to save rate.
- Return Load Probability: test whether lane confidence improves long-haul booking requests.
- AI Explanation Card: test whether explainability improves recommendation CTR.
- Onboarding Preference Capture: test whether personalization improves first-load save rate.

## Technical Architecture

```text
/growth page
  -> mock data from lib/growth/mock-data.ts
  -> deterministic scoring from lib/growth/scoring.ts
  -> React components in components/growth
  -> optional PM Copilot API route at /api/growth-insights
  -> deterministic fallback from lib/growth/insights.ts
```

The feature is demo-first. It does not require live Trucker Path APIs, database migrations, auth, or new environment variables. Gemini can enhance PM Copilot output when `GOOGLE_GENERATIVE_AI_API_KEY` exists, but deterministic fallback remains the default safety path.

## Analytics Event Spec

```ts
type GrowthAnalyticsEvent =
  | "growth_page_viewed"
  | "onboarding_started"
  | "onboarding_completed"
  | "load_recommendation_viewed"
  | "load_card_clicked"
  | "load_saved"
  | "booking_requested"
  | "booking_confirmed"
  | "pm_copilot_generated"
  | "experiment_viewed";
```

The demo logs selected events to the console in development only. There is no analytics backend.

## Demo Script

I built this on top of my hackathon TruckerPath Dispatcher OS. The original project focused on dispatch operations: routing, exceptions, assignments, detention, compliance, and billing. For this AI-native PM internship, I added a marketplace growth layer.

This page shows how a driver moves from onboarding to load discovery to booking. Each load gets a deterministic LoadPilot Score based on payout, deadhead, fuel, HOS, parking, broker reliability, and return-load probability.

The PM dashboard shows activation, conversion, and retention. The integration panel shows which marketplace signals power recommendations. The PM Copilot turns driver feedback into a product insight, experiment, hypothesis, metrics, and PRD draft.

The goal is to show both technical implementation and product judgment: how AI can help Trucker Path turn fragmented logistics data into better decisions for drivers, fleets, and product teams.

## Resume Bullet

Extended a TruckerPath hackathon Dispatcher OS into an AI-native marketplace growth layer with driver onboarding, AI-scored load discovery, booking funnel analytics, partner-signal integrations, and a PM Copilot that synthesizes driver feedback into PRDs, hypotheses, and activation/conversion/retention experiments.
