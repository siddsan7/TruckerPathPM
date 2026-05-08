import { expect, test } from "@playwright/test";

test("growth dashboard renders and supports the marketplace demo flow", async ({ page }) => {
  await page.goto("/growth");

  await expect(page.getByRole("heading", { name: "Marketplace Growth Layer" })).toBeVisible();
  await expect(page.getByLabel("Growth KPI strip")).toContainText("Onboarding completion");
  await expect(page.getByRole("heading", { name: "Preference capture snapshot" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ranked by true marketplace value" })).toBeVisible();

  await page.getByTestId("load-card-load-005").click();
  await expect(page.getByTestId("load-detail-panel")).toContainText("Phoenix, AZ -> Los Angeles, CA");

  await page.getByRole("button", { name: "Save load" }).click();
  await expect(page.getByRole("button", { name: "Saved load" })).toBeVisible();

  await page.getByTestId("request-booking").click();
  await expect(page.getByRole("button", { name: "Booking requested" })).toBeVisible();

  await expect(page.getByRole("heading", { name: "Activation to confirmed booking" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Signals powering recommendation quality" })).toBeVisible();
  await expect(page.getByTestId("pm-copilot-panel")).toContainText("Generated PM brief");
  await expect(page.getByRole("heading", { name: "Activation, conversion, and retention bets" })).toBeVisible();
});
