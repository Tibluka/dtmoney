import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api'

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>

interface TransactionsContextDate {
    transactions: Array<Transaction>;
    params: string;
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextDate>({} as TransactionsContextDate)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Array<Transaction>>([])
    const [params, setParams] = useState('/transactions')

    useEffect(() => {
        api.get(params).then(response => setTransactions(response.data))
    }, [])

    async function createTransaction(transactionInput: TransactionInput) {
        const response = await api.post('transactions', { ...transactionInput, createdAt: new Date() })
        const transaction = response.data
        setTransactions([
            ...transactions,
            transaction
        ])
    }


    return (
        <TransactionsContext.Provider value={{ transactions, params, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext)
    return context
}

