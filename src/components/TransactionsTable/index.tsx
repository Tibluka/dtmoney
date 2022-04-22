import { Container, Filter } from "./styles";
import { useTransactions } from "../../hooks/useTransactionsContext";
import { useState } from "react";

export function TransactionsTable() {
    const { transactions } = useTransactions()
    const [search, setSearch] = useState('')

    function showTransactions() {
        return (
            transactions.filter(results => results.category.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map(transaction => (
                <tr key={transaction.id}>
                    <td>{transaction.title}</td>
                    <td className={transaction.type}>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(transaction.amount)}
                    </td>
                    <td> {transaction.category}</td>
                    <td>
                        {new Intl.DateTimeFormat('pt-BR')
                            .format(new Date(transaction.createdAt))}
                    </td>
                </tr>
            ))
        )
    }

    return (
        <Container>

            <Filter>
                <input type="text" value={search}
                    onChange={event => setSearch(event.target.value)} />
            </Filter>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {showTransactions()}
                </tbody>
            </table>
        </Container>
    )
}
