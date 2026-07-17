import { createServer } from "node:http";

const PORT = Number(process.env.PORT || 3000);
const HOST = "0.0.0.0";
const startedAt = new Date().toISOString();
const contractAddress = process.env.REFI_CONTRACT_ADDRESS?.trim() || null;
const rpcUrl = process.env.ROBINHOOD_RPC_URL?.trim() || null;
const allowedOrigin = process.env.ALLOWED_ORIGIN?.trim() || "*";

function json(response, status, body) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", "access-control-allow-origin": allowedOrigin, "access-control-allow-methods": "GET, OPTIONS", "x-content-type-options": "nosniff", "referrer-policy": "no-referrer" });
  response.end(JSON.stringify(body));
}

const isAddress = (value) => /^0x[a-fA-F0-9]{40}$/.test(value);
const server = createServer((request, response) => {
  if (request.method === "OPTIONS") return json(response, 204, {});
  if (request.method !== "GET") return json(response, 405, { error: "method_not_allowed" });
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  if (url.pathname === "/health") return json(response, 200, { ok: true, service: "refi-api", startedAt });
  if (url.pathname === "/api/status") return json(response, 200, { ok: true, phase: contractAddress ? "configured" : "prelaunch", network: "Robinhood Chain", chainId: 4663, contractConfigured: Boolean(contractAddress), rpcConfigured: Boolean(rpcUrl), metrics: { portfolioValueUsd: 0, yieldEarnedUsd: 0, settlements: 0 }, disclaimer: "Metrics remain zero until verified onchain activity is indexed." });
  if (url.pathname.startsWith("/api/wallet/")) {
    const address = decodeURIComponent(url.pathname.slice("/api/wallet/".length));
    if (!isAddress(address)) return json(response, 400, { ok: false, error: "invalid_evm_address" });
    return json(response, 200, { ok: true, address, eligible: null, reason: contractAddress ? "indexer_not_enabled" : "contract_not_published" });
  }
  return json(response, 404, { error: "not_found", endpoints: ["/health", "/api/status", "/api/wallet/:address"] });
});

server.listen(PORT, HOST, () => console.log(`REFI API listening on ${HOST}:${PORT}`));
function shutdown(signal) { console.log(`${signal} received; closing REFI API`); server.close(() => process.exit(0)); setTimeout(() => process.exit(1), 10_000).unref(); }
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
