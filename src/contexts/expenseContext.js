import { createContext, useContext, useState } from "react";

const ExpenseContext = createContext();
const ExpenseUpdateContext = createContext();

export function useExpense() {
  return useContext(ExpenseContext);
}

export function useUpdateExpense() {
  return useContext(ExpenseUpdateContext);
}

export function ExpenseProvider({ children }) {
  const [expense, setExpense] = useState([]);

  function addExpense(newExpense) {
    setExpense((expenses) => [...expenses, { ...newExpense }]);
  }

  function updateExpense(updatedExpense) {
    setExpense((expenses) => {
      expenses.find((expense) => (expense.id = updatedExpense.id));
    });
  }

  return (
    <ExpenseContext.Provider value={expense}>
      <ExpenseUpdateContext.Provider value={updateExpense}>
        {children}
      </ExpenseUpdateContext.Provider>
    </ExpenseContext.Provider>
  );
}
