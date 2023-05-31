import { createContext, useContext, useState } from "react";

const TransactionContext = createContext();
const TransactionUpdateContext = createContext();
const TransactionAddContext = createContext();

const TransactionsContext = createContext();
const TransactionsUpdateContext = createContext();
const TransactionsAddContext = createContext();

export function useTransaction() {
  return useContext(TransactionContext);
}

export function useUpdateTransaction() {
  return useContext(TransactionUpdateContext);
}

export function useAddTransaction() {
  return useContext(TransactionAddContext);
}

export function useTransactions() {
  return useContext(TransactionsContext);
}

export function useUpdateTransactions() {
  return useContext(TransactionsUpdateContext);
}

export function useAddTransactions() {
  return useContext(TransactionsAddContext);
}

export function TransactionProvider({ children }) {
  const [transaction, setTransaction] = useState([]);
  const [transactions, setTransactions] = useState({});

  function updateTransactions(updatedTransactions) {
    setTransactions(updatedTransactions);
  }

  function addTransaction(newTransaction) {
    setTransaction(transactions => [...transactions, { ...newTransaction }]);
  }

  function updateTransaction(updatedTransaction) {
    setTransaction(transactions => {
      transactions.find(
        transaction => (transaction.id = updatedTransaction.id)
      );
    });
  }

  return (
    <TransactionsContext.Provider value={transactions}>
      <TransactionContext.Provider value={transaction}>
        <TransactionsUpdateContext.Provider value={updateTransactions}>
          <TransactionUpdateContext.Provider value={updateTransaction}>
            <TransactionAddContext.Provider value={addTransaction}>
              {children}
            </TransactionAddContext.Provider>
          </TransactionUpdateContext.Provider>
        </TransactionsUpdateContext.Provider>
      </TransactionContext.Provider>
    </TransactionsContext.Provider>
  );
}
