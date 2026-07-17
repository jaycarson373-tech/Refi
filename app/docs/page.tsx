import Link from "next/link";

const sections = [
  ["01", "Purpose", "REFI is an allocation interface for tokenized markets. It is designed to make target weights, execution state, and settlement evidence legible."],
  ["02", "Launch basket", "The initial target is 45% broad US equities, 25% technology, 20% tokenized treasuries, and 10% onchain cash yield. These are design targets—not current holdings."],
  ["03", "Data standard", "The dashboard starts at zero. A metric changes only after the corresponding contract event or indexed record can be verified."],
  ["04", "Wallet eligibility", "The public checker validates EVM addresses today. Eligibility remains unknown until the official contract and indexer are configured."],
  ["05", "Risk", "Tokenized market assets can lose value, depeg, become illiquid, or carry issuer, smart-contract, oracle, bridge, and regulatory risk."],
];

export default function DocsPage() {
  return <main className="docs-page">
    <header className="nav-shell"><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true"><i/><i/><i/><i/></span><span>REFI</span></Link><nav><Link href="/">Product</Link><Link href="#protocol">Protocol</Link><Link href="#api">API</Link><Link href="#risk">Risk</Link></nav><div className="network"><span /> Documentation · v0.1</div></header>
    <section className="docs-hero"><p className="eyebrow">Protocol documentation</p><h1>Clear rules.<br/>Verifiable state.</h1><p>REFI documents what the system is designed to do, what is already working, and what remains inactive before contracts launch.</p></section>
    <section className="docs-grid" id="protocol"><aside><strong>Contents</strong>{sections.map(([number,title])=><a href={`#doc-${number}`} key={number}>{number} — {title}</a>)}</aside><article>{sections.map(([number,title,copy])=><section id={`doc-${number}`} key={number}><span>{number}</span><h2>{title}</h2><p>{copy}</p></section>)}</article></section>
    <section className="api-doc" id="api"><p className="eyebrow">Public service</p><h2>Railway-ready API</h2><p>The backend exposes health, protocol status, and wallet-validation endpoints. It listens on Railway’s injected port and returns explicit pre-launch state.</p><div className="code-block"><code>GET /health</code><code>GET /api/status</code><code>GET /api/wallet/:address</code></div></section>
    <section className="risk-doc" id="risk"><p className="eyebrow">Important</p><h2>Independent and experimental.</h2><p>REFI is not affiliated with Robinhood Markets, Inc. It is not an ETF, broker, exchange, bank, or investment adviser. Nothing in this interface is investment advice or a guarantee of availability, liquidity, yield, or returns.</p></section>
    <footer><Link className="brand" href="/"><span className="brand-mark" aria-hidden="true"><i/><i/><i/><i/></span><span>REFI</span></Link><p>Documentation is versioned with the product source.</p><Link href="/">Return to product →</Link></footer>
  </main>;
}
