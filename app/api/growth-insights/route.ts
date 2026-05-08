import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { GEMINI_MODEL, hasGeminiConfig } from "@/lib/gemini";
import { generateFallbackPmInsight } from "@/lib/growth/insights";
import type { PmCopilotOutput } from "@/lib/growth/types";

export const dynamic = "force-dynamic";

function parseMaybeJson(text: string, feedback: string[]): PmCopilotOutput {
  try {
    const parsed = JSON.parse(text) as Partial<PmCopilotOutput>;
    if (
      parsed.topInsight &&
      parsed.userPainPoint &&
      parsed.suggestedExperiment &&
      parsed.hypothesis &&
      parsed.primaryMetric &&
      Array.isArray(parsed.secondaryMetrics) &&
      parsed.prdDraft
    ) {
      return {
        topInsight: parsed.topInsight,
        userPainPoint: parsed.userPainPoint,
        suggestedExperiment: parsed.suggestedExperiment,
        hypothesis: parsed.hypothesis,
        primaryMetric: parsed.primaryMetric,
        secondaryMetrics: parsed.secondaryMetrics,
        prdDraft: parsed.prdDraft,
        risksAndMitigations: Array.isArray(parsed.risksAndMitigations)
          ? parsed.risksAndMitigations
          : undefined,
        source: "gemini",
      };
    }
  } catch {
    // Fall through to deterministic fallback.
  }
  return generateFallbackPmInsight(feedback);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { feedback?: string[] };
  const feedback = body.feedback?.filter(Boolean) ?? [];
  const fallback = generateFallbackPmInsight(feedback);

  if (!hasGeminiConfig) {
    return NextResponse.json(fallback);
  }

  try {
    const { text } = await generateText({
      maxRetries: 0,
      model: google(GEMINI_MODEL),
      prompt: `You are an AI-native product management assistant for a trucking marketplace.
Given driver feedback and marketplace context, produce concise JSON only with:
topInsight, userPainPoint, suggestedExperiment, hypothesis, primaryMetric, secondaryMetrics, prdDraft, risksAndMitigations.
Keep it concrete and relevant to load discovery, booking, onboarding, marketplace integrations, activation, conversion, and retention.

Driver feedback:
${feedback.join("\n")}`,
    });

    return NextResponse.json(parseMaybeJson(text, feedback));
  } catch {
    return NextResponse.json(fallback);
  }
}
