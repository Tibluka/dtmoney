import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api'

interface Transaction {
    id?: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category' | 'id'>

interface TransactionsContextDate {
    transactions: Array<Transaction>;
    createTransaction: (transaction: TransactionInput) => Promise<void>;
    updateTransaction: (transaction: TransactionInput) => Promise<void>;
    deleteTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextDate>({} as TransactionsContextDate)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Array<Transaction>>([])

    useEffect(() => {
        api.get('/transactions').then(response => setTransactions(response.data))
    }, [])

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post(`transactions`, { ...transactionInput, createdAt: new Date() })
        const transaction = response.data
        setTransactions([
            ...transactions,
            transaction
        ])
    }

    async function updateTransaction(transactionInput: TransactionInput) {
        const response = await api.put(`transactions/${transactionInput.id}`, { ...transactionInput })
        setTransactions(
            transactions.map(transaction => {
                if (response.data.id === transaction.id) {
                    return { ...response.data, createdAt: transaction.createdAt }
                } else return transaction
            })
        )
    }

    async function deleteTransaction(transactionInput: TransactionInput) {
        await api.delete(`transactions/${transactionInput.id}`)
        setTransactions(transactions.filter(transaction => transaction.id !== transactionInput.id))
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction, updateTransaction, deleteTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext)
    return context
}

