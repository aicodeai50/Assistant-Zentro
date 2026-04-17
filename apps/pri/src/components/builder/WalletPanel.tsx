"use client";

type Props = {
  balance: number | null;
  totalPurchased: number | null;
  totalSpent: number | null;
  planName: string;
  onRefresh: () => void;
};

export default function WalletPanel({
  balance,
  totalPurchased,
  totalSpent,
  planName,
  onRefresh,
}: Props) {
  return (
    <section className="builder-card">
      <div className="builder-card-header">
        <h2>Wallet</h2>
        <span className="builder-badge">Tokens</span>
      </div>

      <div className="builder-stats">
        <div className="builder-stat">
          <span>Balance</span>
          <strong>{balance ?? "--"}</strong>
        </div>
        <div className="builder-stat">
          <span>Plan</span>
          <strong>{planName || "--"}</strong>
        </div>
        <div className="builder-stat">
          <span>Total Purchased</span>
          <strong>{totalPurchased ?? "--"}</strong>
        </div>
        <div className="builder-stat">
          <span>Total Spent</span>
          <strong>{totalSpent ?? "--"}</strong>
        </div>
      </div>

      <div className="builder-actions">
        <button className="builder-button" onClick={onRefresh}>
          Refresh Wallet
        </button>
        <a
          className="builder-button builder-button-accent"
          href="https://shynvo.lemonsqueezy.com/checkout"
          target="_blank"
          rel="noreferrer"
        >
          Buy Tokens
        </a>
      </div>
    </section>
  );
}
