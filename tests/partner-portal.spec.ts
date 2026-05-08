import { expect, test } from "@playwright/test";

test("partner portal walks through the post-contract lifecycle", async ({ page }) => {
  await page.goto("/partner-portal/partners");
  await expect(page.getByRole("heading", { name: "Partner Terms & Conditions" })).toBeVisible();
  await expect(page.getByText("Expected referral volume")).toBeVisible();
  await expect(page.getByText("Terms & Conditions Summary")).toBeVisible();
  await expect(page.getByText("{{partner_legal_name}}")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Partner Dashboard" })).toHaveCount(0);

  await page.getByTestId("save-terms").click();
  await expect(page).toHaveURL(/\/partner-portal\/contract/);
  await expect(page.getByRole("heading", { name: "Partnership Agreement" })).toBeVisible();
  await expect(page.getByText("Terms saved. Contract generation started.")).toBeVisible();

  await page.getByRole("button", { name: "Demo: mark signed" }).click();
  await page.getByRole("link", { name: "Continue to Payout Setup" }).click();
  await expect(page).toHaveURL(/\/partner-portal\/onboarding\/payout/);
  await expect(page.getByRole("heading", { name: "Set Up Payouts" })).toBeVisible();
  await page.getByRole("button", { name: "Start Stripe Connect Setup" }).click();
  await expect(page.getByRole("heading", { name: "Stripe Connect Payout Setup" })).toBeVisible();
  await expect(page.getByText("Business legal name")).toBeVisible();
  for (let index = 0; index < 6; index += 1) {
    await page.getByTestId("stripe-walkthrough-next").click();
  }
  await expect(page.getByText("Payout Ready")).toBeVisible();

  await page.goto("/partner-portal/referrals");
  await expect(page.getByText("ACME-FUEL-15", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "How Attribution Works" })).toBeVisible();
  await expect(page.getByText("Signup is matched to Acme")).toBeVisible();
  await page.goto("/partner-portal/admin/partners");
  await expect(page.getByRole("heading", { name: "Internal Admin View" })).toBeVisible();
  await expect(page.getByText("Needs Attention")).toBeVisible();
  await expect(page.getByRole("cell", { name: "Desert Insurance Group" })).toBeVisible();
});
