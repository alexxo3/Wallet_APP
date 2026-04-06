import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams } from 'react-router-dom'
import walletJson from '../data/transactions.json'
import { formatCurrency, formatDetailDateTime } from '../utils/formatDate'
import type { Transaction, WalletData } from '../types/wallet'

const data = walletJson as WalletData

function findTransaction(id: string | undefined): Transaction | undefined {
  if (!id) return undefined
  return data.transactions.find((t) => t.id === id)
}

function buildDescriptionLine(tx: Transaction): string {
  if (tx.pending) {
    return `Pending - ${tx.description}`
  }
  return tx.description
}

export function TransactionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const tx = findTransaction(id)

  if (!tx) {
    return (
      <div className="wallet-page wallet-page--detail">
        <header className="detail-nav">
          <button type="button" className="detail-back" onClick={() => navigate(-1)} aria-label="Back">
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </header>
        <p className="detail-missing">Transaction not found.</p>
      </div>
    )
  }

  const typeLabel = tx.type === 'payment' ? 'Payment' : 'Credit'
  const statusLine = `Status: ${tx.status}`

  return (
    <div className="wallet-page wallet-page--detail">
      <header className="detail-nav">
        <button type="button" className="detail-back" onClick={() => navigate(-1)} aria-label="Back">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </header>

      <div className="detail-header">
        <p className="detail-header__amount">{formatCurrency(tx.amount, { type: tx.type })}</p>
        <p className="detail-header__merchant">{tx.merchant}</p>
        <p className="detail-header__when">{formatDetailDateTime(tx.date)}</p>
      </div>

      <article className="detail-card">
        <div className="detail-card__block">
          <p className="detail-card__status">{statusLine}</p>
          <p className="detail-card__muted">{tx.paymentMethod}</p>
        </div>
        <div className="detail-card__divider" />
        <dl className="detail-card__rows">
          <div className="detail-dl-row">
            <dt>Type</dt>
            <dd>{typeLabel}</dd>
          </div>
          <div className="detail-dl-row">
            <dt>Description</dt>
            <dd>{buildDescriptionLine(tx)}</dd>
          </div>
          {tx.authorizedUser ? (
            <div className="detail-dl-row">
              <dt>Authorized user</dt>
              <dd>{tx.authorizedUser}</dd>
            </div>
          ) : null}
          {tx.cashbackPercent != null ? (
            <div className="detail-dl-row">
              <dt>Cashback</dt>
              <dd>{tx.cashbackPercent}%</dd>
            </div>
          ) : null}
        </dl>
        <div className="detail-card__divider" />
        <div className="detail-card__total">
          <span>Total</span>
          <span>{formatCurrency(tx.amount)}</span>
        </div>
      </article>
    </div>
  )
}
