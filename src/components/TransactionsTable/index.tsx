import { Container, Filter } from "./styles";
import { useTransactions } from "../../hooks/useTransactionsContext";
import { useEffect, useState } from "react";
import { RadioBox, TransactionTypeContainer } from "../NewTransactionModal/styles";
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import trashImg from '../../assets/trash.svg'
import editImg from '../../assets/edit.svg'

interface IModal {
    title: string;
    amount: number;
    category: string;
    type: string;
}
interface DashboardProps {
    onOpenNewTransactionModal: (values: IModal) => void;
}

export function TransactionsTable({ onOpenNewTransactionModal }: DashboardProps) {

    const { transactions, deleteTransaction } = useTransactions()
    const [search, setSearch] = useState('')
    const [type, setType] = useState('')

    function showTransactions() {
        return (
            transactions.filter((transaction: any) => {
                if (lookup(transaction)) {
                    if (transaction.type.includes(type)) { return transaction }
                }
            }).map(transaction => (
                <tr key={transaction.id}>
                    <td className="ellipsis">{transaction.title}</td>
                    <td className={transaction.type}>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(transaction.amount)}
                    </td>
                    <td className="ellipsis"> {transaction.category}</td>
                    <td>
                        {new Intl.DateTimeFormat('pt-BR')
                            .format(new Date(transaction.createdAt))}
                    </td>
                    <td>
                        <button className="edit" onClick={() => deleteTransaction(transaction)}>
                            <img src={trashImg} alt="Excluir" />
                        </button>
                        <button className="delete" onClick={() => onOpenNewTransactionModal(transaction)}>
                            <img src={editImg} alt="Editar" />
                        </button>
                    </td>
                </tr>
            ))
        )
    }

    function lookup(transaction: any) {
        let { title, type, category } = transaction

        title = title.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        type = type.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        category = category.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        if (category.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
            title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
            type.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
            String(transaction.amount).includes(search)) {
            return true
        } else return false
    }

    return (
        <Container>
            <Filter>
                <input type="text" value={search} placeholder="Pesquisar por categoria, tipo, valor ou título"
                    onChange={event => setSearch(event.target.value)} />
                <TransactionTypeContainer>
                    <RadioBox
                        onClick={() => type === 'deposit' ? setType('') : setType('deposit')}
                        isActive={type === 'deposit'}
                        type="button"
                        activeColor="green">
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entradas</span>
                    </RadioBox>
                    <RadioBox
                        onClick={() => type === 'withdraw' ? setType('') : setType('withdraw')}
                        isActive={type === 'withdraw'}
                        type="button"
                        activeColor="red">
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saídas</span>
                    </RadioBox>
                </TransactionTypeContainer>
            </Filter>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {showTransactions()}
                </tbody>
            </table>
        </Container>
    )
}
