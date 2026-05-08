# Partner Portal UX Flow

## Summary

The `/partner-portal` route family turns the NavPro partner post-contract process into a guided UX prototype. It begins after HubSpot Closed Won, when Mihir saves agreed Acme Fuel Solutions LLC terms, then walks through contract status, payout setup, demo account provisioning, referral attribution, payout transparency, partner dashboard, and internal admin monitoring.

## Required Screens

- `/partner-portal`: role switcher and lifecycle overview.
- `/partner-portal/partners`: agreed terms gate before the lifecycle starts.
- `/partner-portal/admin`: internal command center and system mapping.
- `/partner-portal/admin/new-partner`: agreed terms input and DocuSign merge-field preview.
- `/partner-portal/contract`: signer-facing partnership agreement status.
- `/partner-portal/onboarding/payout`: mocked Stripe Connect payout setup.
- `/partner-portal/onboarding/demo-account`: mocked NavPro demo account provisioning.
- `/partner-portal/referrals`: referral code/link, attribution explainer, activity preview.
- `/partner-portal/payouts`: earnings cards, calculation table, clawback note, next payout.
- `/partner-portal/dashboard`: partner-facing steady-state dashboard for Sarah.
- `/partner-portal/admin/partners`: internal partner table, stuck-partner alerts, detail drawer.

## Demo Data

Primary partner: Acme Fuel Solutions LLC.

- Partner type: fuel card reseller
- Primary contact: Sarah Mendez
- Signing authority: Marcus Reyes
- Tier: Silver
- Revenue share: 15%
- Attribution window: 60 days
- Payout cadence: monthly, paid on the 15th
- Minimum payout: $50
- Clawback window: 60 days
- Demo account: 1 full-access NavPro demo account

## Product Intent

This implementation is UX-first and demo-first. It does not call DocuSign, Stripe, HubSpot, NavPro APIs, or a referral platform. The portal visually demonstrates how a v1 could wire existing systems together while keeping Sarah's partner experience simple and Mihir's internal view operationally useful.

## V1 System Mapping

- HubSpot: source of truth for pre-contract deal/contact data
- DocuSign: contract template and signature status
- Stripe Connect: payout onboarding and transfers
- NavPro API: demo account provisioning and subscription data
- Portal DB: partner terms, referral attribution, payout snapshots
- Notion: partner resources and SOP links
- Gmail: partner-facing notifications

Potential buy options for referral tracking: Tolt, Rewardful, PartnerStack. For v1, buy if speed matters more than custom control.

## Demo Script

1. Mihir opens `/partner-portal/partners` from the Partners tab and reviews Acme terms.
2. Mihir clicks Save Terms, making the terms version the operational source of truth.
3. The portal starts contract generation at `/partner-portal/contract`.
4. Marcus signs at `/partner-portal/contract`.
5. Sarah completes the mocked Stripe Connect walkthrough at `/partner-portal/onboarding/payout`.
6. NavPro demo account provisioning completes at `/partner-portal/onboarding/demo-account`.
7. Sarah receives referral link `ACME-FUEL-15` at `/partner-portal/referrals`.
8. Earnings are transparent at `/partner-portal/payouts`.
9. Sarah uses `/partner-portal/dashboard` as her home base.
10. Internal teams monitor partner exceptions at `/partner-portal/admin/partners`.
