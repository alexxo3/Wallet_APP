import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import walletJson from '../data/transactions.json'
import { TransactionIcon } from '../components/TransactionIcon'
import { dailyPointsLabel } from '../utils/dailyPoints'
import { formatCurrency, formatListDate } from '../utils/formatDate'
import type { Transaction, WalletData } from '../types/wallet'

const data = walletJson as WalletData

function buildDescriptionLine(tx: Transaction): string {
  const base = tx.description
  if (tx.pending) {
    return `Pending - ${base}`
  }
  return base
}

function buildMetaLine(tx: Transaction): string {
  const dateStr = formatListDate(tx.date)
  if (tx.authorizedUser) {
    return `${tx.authorizedUser} — ${dateStr}`
  }
  return dateStr
}

export function TransactionsList() {
  const navigate = useNavigate()
  const limit = data.creditLimit
  const balance = data.cardBalance
  const available = Math.max(0, limit - balance)
  const pointsLabel = dailyPointsLabel()

  return (
    <div className="wallet-page">
      <div className="wallet-scroll">
        <section className="summary-grid" aria-label="Account summary">
          <div className="summary-left">
            <article className="card card-balance">
              <p className="card-label">Card Balance</p>
              <p className="card-balance__amount">{formatCurrency(balance)}</p>
              <p className="card-sub">
                {formatCurrency(available)} Available
              </p>
            </article>
            <article className="card card-points">
              <p className="card-label">Daily Points</p>
              <p className="card-points__value">{pointsLabel}</p>
            </article>
          </div>
          <article className="card card-payment-due">
            <p className="card-payment-due__title">{data.paymentStatusTitle}</p>
            <p className="card-payment-due__body">{data.paymentStatusBody}</p>
            <div className="card-payment-due__icon" aria-hidden>
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
          </article>
        </section>

        <h2 className="section-title">Latest Transactions</h2>

        <div className="tx-list" role="list">
          {data.transactions.map((tx) => (
            <button
              key={tx.id}
              type="button"
              className="tx-row"
              role="listitem"
              onClick={() => navigate(`/transaction/${tx.id}`)}
            >
              <TransactionIcon transactionId={tx.id} variant={tx.iconVariant} />
              <div className="tx-row__main">
                <p className="tx-row__title">{tx.merchant}</p>
                <p className="tx-row__desc">{buildDescriptionLine(tx)}</p>
                <p className="tx-row__meta">{buildMetaLine(tx)}</p>
              </div>
              <div className="tx-row__right">
                <p className="tx-row__amount">
                  {formatCurrency(tx.amount, { type: tx.type })}
                </p>
                {tx.cashbackPercent != null ? (
                  <span className="tx-row__badge">{tx.cashbackPercent}%</span>
                ) : (
                  <span className="tx-row__badge tx-row__badge--spacer" />
                )}
              </div>
              <FontAwesomeIcon icon={faChevronRight} className="tx-row__chevron" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
