import { FormEvent, useEffect, useState } from 'react'
import Modal from 'react-modal'
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from '../../hooks/useTransactionsContext'
import { Container, RadioBox, TransactionTypeContainer } from './styles'

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    values: {
        title: string;
        amount: number;
        category: string;
        type: string;
        id?: number;
    }
}

export function NewTransactionModal({ isOpen, onRequestClose, values }: NewTransactionModalProps) {
    const [title, setTitle] = useState<string>('')
    const [amount, setAmount] = useState(values.amount)
    const [category, setCategory] = useState(values.category)
    const [type, setType] = useState(values.type)
    const [id, setId] = useState(values.id)
    const { createTransaction, updateTransaction } = useTransactions();


    useEffect(() => {
        setTitle(values.title)
        setAmount(values.amount)
        setType(values.type)
        setCategory(values.category)
        setId(values.id)
    }, [values])

    async function handleTransaction(event: FormEvent) {
        event.preventDefault()
        if (id) {
            await updateTransaction({ title, amount, category, type, id })
        } else {
            await createTransaction({ title, amount, category, type })
        }
        setTitle(values.title)
        setAmount(values.amount)
        setCategory(values.category)
        setType(values.type)
        onRequestClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content">

            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close">
                <img src={closeImg} alt="Fechar modal" />
            </button>

            <Container onSubmit={handleTransaction}>
                <h2>{id ? 'Editar' : 'Cadastrar'} transação</h2>
                <input placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />
                <input type="number" placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        type="button"
                        activeColor="green">
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        onClick={() => setType('withdraw')}
                        isActive={type === 'withdraw'}
                        type="button"
                        activeColor="red">

                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>

                    </RadioBox>

                </TransactionTypeContainer>

                <input placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">
                    {id ? 'Editar' : 'Cadastrar'}
                </button>
            </Container>

        </Modal>
    )
}
