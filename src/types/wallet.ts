export type TransactionType = 'credit' | 'payment'

export type IconVariant = 'apple' | 'payment' | 'ikea' | 'target' | 'generic'

export interface Transaction {
  id: string
  type: TransactionType
  merchant: string
  description: string
  amount: number
  date: string
  pending?: boolean
  authorizedUser?: string
  cashbackPercent?: number
  status: 'Approved' | 'Pending'
  paymentMethod: string
  iconVariant: IconVariant
}

export interface WalletData {
  creditLimit: number
  cardBalance: number
  paymentStatusTitle: string
  paymentStatusBody: string
  transactions: Transaction[]
}
