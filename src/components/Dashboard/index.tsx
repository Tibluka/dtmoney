import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";
import { Container } from "./styles";

interface IModal {
    title: string;
    amount: number;
    category: string;
    type: string;
    id?: number;
  }
interface DashboardProps {
    onOpenNewTransactionModal: (values: IModal) => void
}

export function Dashboard({ onOpenNewTransactionModal }: DashboardProps) {
    return (
        <Container>
            <Summary />
            <TransactionsTable onOpenNewTransactionModal={onOpenNewTransactionModal} />
        </Container>
    )
}


