import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { GlobalStyle } from './styles/global'
import Modal from 'react-modal'
import { useState } from 'react';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactionsContext';

Modal.setAppElement('#root')


interface IModal {
  title: string;
  amount: number;
  category: string;
  type: string;
  id?: number;
}

export function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  const [values, setValues] = useState<IModal | null>(null)

  function handleOpenNewTransactionModal(data: IModal | null = null) {
    setValues(data)
    setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setValues(null);
    setIsNewTransactionModalOpen(false)
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <NewTransactionModal
        values={
          {
            amount: values?.amount || 0,
            category: values?.category || '',
            title: values?.title || '',
            type: values?.type || '',
            id: values?.id
          }
        }
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal} />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
