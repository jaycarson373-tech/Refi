export async function GET() {
  return Response.json({ ok: true, phase: "prelaunch", network: "Robinhood Chain", contractConfigured: false, metrics: { portfolioValueUsd: 0, yieldEarnedUsd: 0, settlements: 0 }, updatedAt: new Date().toISOString() }, { headers: { "cache-control": "no-store" } });
}
