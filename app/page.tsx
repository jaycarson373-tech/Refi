"use client";

import { useEffect, useMemo, useState } from "react";

const allocations = [
  { name: "US equities", ticker: "USX", share: 45, color: "#087a37" },
  { name: "Tech index", ticker: "TEC", share: 25, color: "#4da447" },
  { name: "Treasuries", ticker: "UST", share: 20, color: "#91c950" },
  { name: "Cash yield", ticker: "CASH", share: 10, color: "#d5e969" },
];

const marketRows = [
  { symbol: "USX", name: "Broad US Equity", allocation: "45%", status: "Launch basket" },
  { symbol: "TEC", name: "Technology Index", allocation: "25%", status: "Launch basket" },
  { symbol: "UST", name: "Tokenized Treasuries", allocation: "20%", status: "Launch basket" },
  { symbol: "CASH", name: "Onchain Cash Yield", allocation: "10%", status: "Launch basket" },
];

function formatCountdown(total: number) {
  const minutes = Math.floor(total / 60).toString().padStart(2, "0");
  const seconds = (total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function Home() {
  const [seconds, setSeconds] = useState(15 * 60);
  const [amount, setAmount] = useState(1000);
  const [wallet, setWallet] = useState("");
  const [walletMessage, setWalletMessage] = useState("Enter a public address to validate its format.");

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds((value) => (value <= 1 ? 15 * 60 : value - 1)), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const preview = useMemo(
    () => allocations.map((item) => ({ ...item, value: (amount * item.share) / 100 })),
    [amount],
  );

  function checkWallet(event: React.FormEvent) {
    event.preventDefault();
    const valid = /^0x[a-fA-F0-9]{40}$/.test(wallet.trim());
    setWalletMessage(
      valid
        ? "Valid EVM address. Live eligibility will activate when the REFI contract is published."
        : "That is not a valid 42-character EVM address.",
    );
  }

  return (
    <main>
      <header className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#overview" aria-label="REFI home">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span>
          <span>REFI</span>
        </a>
        <nav>
          <a href="#overview">Overview</a>
          <a href="#markets">Markets</a>
          <a href="#mechanism">Mechanism</a>
          <a href="#thesis">Thesis</a>
        </nav>
        <div className="network"><span /> Robinhood Chain · ready</div>
      </header>

      <section className="hero" id="overview">
        <div className="hero-copy">
          <p className="eyebrow">Robinhood Equity Finance</p>
          <h1>Equity,<br />reimagined<br />onchain.</h1>
          <p className="lede">One position for diversified access to tokenized equity markets, automated allocation, and transparent onchain settlement.</p>
          <div className="actions">
            <a className="button primary" href="#markets">Explore markets <span>→</span></a>
            <a className="button secondary" href="#mechanism">How REFI works</a>
          </div>
          <p className="launch-note"><span /> Pre-launch interface · metrics reset to zero</p>
        </div>

        <article className="portfolio-card" aria-label="REFI portfolio preview">
          <div className="card-topline"><span>REFI portfolio · USD</span><span className="pill">Genesis</span></div>
          <div className="balance-row"><strong>$0.00</strong><span>0.00%</span></div>
          <div className="chart" aria-hidden="true">
            <div className="chart-grid" />
            <div className="chart-line"><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="metrics">
            <div><span>Equity value</span><strong>$0</strong></div>
            <div><span>Yield earned</span><strong>$0</strong></div>
            <div><span>Next settlement</span><strong>{formatCountdown(seconds)}</strong></div>
          </div>
          <div className="allocation-head"><strong>Launch allocation</strong><span>100% target</span></div>
          <div className="allocation-body">
            <div className="donut" aria-label="45 percent equities, 25 percent technology, 20 percent treasuries, 10 percent cash yield"><span>4<small>markets</small></span></div>
            <div className="allocation-list">
              {allocations.map((item) => (
                <div className="allocation-row" key={item.ticker}>
                  <span className="token" style={{ background: item.color }}>{item.ticker.slice(0, 1)}</span>
                  <b>{item.name}</b><i><em style={{ width: `${item.share}%`, background: item.color }} /></i><span>{item.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="stat-ribbon" aria-label="Protocol details">
        <div><span className="stat-icon">◎</span><p><small>Network</small><strong>Robinhood Chain</strong></p></div>
        <div><span className="stat-icon">◇</span><p><small>Assets</small><strong>Tokenized markets</strong></p></div>
        <div><span className="stat-icon">⌁</span><p><small>Settlement</small><strong>Transparent</strong></p></div>
        <div><span className="stat-icon">↻</span><p><small>Access</small><strong>24 / 7</strong></p></div>
      </section>

      <section className="section" id="markets">
        <div className="section-heading"><div><p className="eyebrow">The launch basket</p><h2>One position.<br />Four market sleeves.</h2></div><p>REFI is designed to turn a fragmented set of onchain market exposures into one legible allocation. Initial weights are targets and remain inactive until launch.</p></div>
        <div className="market-table">
          <div className="table-row table-head"><span>Market</span><span>Target</span><span>Status</span></div>
          {marketRows.map((row) => <div className="table-row" key={row.symbol}><span><b>{row.symbol}</b><i>{row.name}</i></span><strong>{row.allocation}</strong><em>{row.status}</em></div>)}
        </div>
      </section>

      <section className="mechanism section" id="mechanism">
        <div><p className="eyebrow">A clearer mechanism</p><h2>Allocate once.<br />Track everything.</h2><p className="body-copy">The interface separates target design from live data. Nothing is presented as funded, distributed, or settled until it can be verified onchain.</p></div>
        <ol>
          <li><span>01</span><div><b>Enter one position</b><p>Choose an amount and preview how it maps to the target basket.</p></div></li>
          <li><span>02</span><div><b>Route by target weight</b><p>Each sleeve receives its published share through auditable execution rules.</p></div></li>
          <li><span>03</span><div><b>Verify settlement</b><p>Published contracts and transactions become the source of truth at launch.</p></div></li>
        </ol>
      </section>

      <section className="tools section">
        <article>
          <p className="eyebrow">Allocation preview</p><h3>See where your position goes.</h3>
          <label htmlFor="amount">Position size · USD</label>
          <input id="amount" type="number" min="0" step="100" value={amount} onChange={(event) => setAmount(Math.max(0, Number(event.target.value)))} />
          <div className="preview-list">{preview.map((item) => <p key={item.ticker}><span>{item.name}</span><strong>${item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong></p>)}</div>
        </article>
        <article>
          <p className="eyebrow">Wallet check</p><h3>Validate before launch.</h3>
          <form onSubmit={checkWallet}><label htmlFor="wallet">Public EVM wallet address</label><div className="input-action"><input id="wallet" value={wallet} onChange={(event) => setWallet(event.target.value)} placeholder="0x…" /><button type="submit">Check</button></div></form>
          <p className="wallet-message" aria-live="polite">{walletMessage}</p>
        </article>
      </section>

      <section className="thesis section" id="thesis">
        <p className="eyebrow">The thesis</p>
        <blockquote>Equities are becoming programmable. REFI is building the allocation layer for when they do.</blockquote>
        <p>Markets are moving onchain. The opportunity is not another wrapper with opaque numbers—it is a transparent system where allocation, execution, and settlement can be inspected by anyone.</p>
      </section>

      <footer><a className="brand" href="#overview"><span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span><span>REFI</span></a><p>Robinhood Equity Finance is an independent protocol concept. It is not affiliated with Robinhood Markets, Inc. and is not an ETF, broker, or investment adviser.</p><a href="#overview">Back to top ↑</a></footer>
    </main>
  );
}
