import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import {
  faBagShopping,
  faBullseye,
  faCartShopping,
  faStore,
  faUtensils,
  faWifi,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { IconVariant } from '../types/wallet'
import { darkBackgroundFromId } from '../utils/iconFromId'

const GENERIC_ICONS: IconDefinition[] = [
  faStore,
  faBagShopping,
  faCartShopping,
  faUtensils,
  faWifi,
]

function genericIcon(id: string): IconDefinition {
  let h = 0
  for (let i = 0; i < id.length; i += 1) {
    h = Math.imul(31, h) + id.charCodeAt(i)
    h |= 0
  }
  const idx = Math.abs(h) % GENERIC_ICONS.length
  return GENERIC_ICONS[idx]!
}

interface Props {
  transactionId: string
  variant: IconVariant
}

export function TransactionIcon({ transactionId, variant }: Props) {
  if (variant === 'apple') {
    return (
      <div className="tx-icon tx-icon--apple" aria-hidden>
        <FontAwesomeIcon icon={faApple} />
      </div>
    )
  }
  if (variant === 'payment') {
    return (
      <div className="tx-icon tx-icon--payment" aria-hidden>
        <FontAwesomeIcon icon={faApple} />
      </div>
    )
  }
  if (variant === 'ikea') {
    return (
      <div className="tx-icon tx-icon--ikea" aria-hidden>
        <FontAwesomeIcon icon={faStore} />
      </div>
    )
  }
  if (variant === 'target') {
    return (
      <div className="tx-icon tx-icon--target" aria-hidden>
        <FontAwesomeIcon icon={faBullseye} className="tx-icon__bullseye" />
      </div>
    )
  }
  const bg = darkBackgroundFromId(transactionId)
  return (
    <div className="tx-icon tx-icon--generic" style={{ background: bg }} aria-hidden>
      <FontAwesomeIcon icon={genericIcon(transactionId)} />
    </div>
  )
}
