import { createContext, useContext, useState } from "react";

const ExpenseContext = createContext();
const ExpenseUpdateContext = createContext();
const ExpenseAddContext = createContext();

const ExpensesContext = createContext();
const ExpensesUpdateContext = createContext();
const ExpensesAddContext = createContext();

export function useExpense() {
  return useContext(ExpenseContext);
}

export function useUpdateExpense() {
  return useContext(ExpenseUpdateContext);
}

export function useAddExpense() {
  return useContext(ExpenseAddContext);
}

export function useExpenses() {
  return useContext(ExpensesContext);
}

export function useUpdateExpenses() {
  return useContext(ExpensesUpdateContext);
}

export function useAddExpenses() {
  return useContext(ExpensesAddContext);
}

export function ExpenseProvider({ children }) {
  const [expense, setExpense] = useState([]);
  const [expenses, setExpenses] = useState({});

  function updateExpenses(updatedExpenses) {
    setExpenses(updatedExpenses);
  }

  function addExpense(newExpense) {
    setExpense(expenses => [...expenses, { ...newExpense }]);
  }

  function updateExpense(updatedExpense) {
    setExpense(expenses => {
      expenses.find(expense => (expense.id = updatedExpense.id));
    });
  }

  return (
    <ExpensesContext.Provider value={expenses}>
      <ExpenseContext.Provider value={expense}>
        <ExpensesUpdateContext.Provider value={updateExpenses}>
          <ExpenseUpdateContext.Provider value={updateExpense}>
            <ExpenseAddContext.Provider value={addExpense}>
              {children}
            </ExpenseAddContext.Provider>
          </ExpenseUpdateContext.Provider>
        </ExpensesUpdateContext.Provider>
      </ExpenseContext.Provider>
    </ExpensesContext.Provider>
  );
}
