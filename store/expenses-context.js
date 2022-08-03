const { createContext, useReducer } = require("react");

const DUMMY_EXPENSES = [
  {
    id: "e1",
    title: "A pair of shoes",
    amount: 599.99,
    date: new Date("2022-08-01"),
  },
  {
    id: "e2",
    title: "A pair of pants",
    amount: 1299.99,
    date: new Date("2022-08-02"),
  },
  {
    id: "e3",
    title: "Some bananas",
    amount: 20.0,
    date: new Date("2022-07-31"),
  },
  {
    id: "e4",
    title: "A can of milk",
    amount: 60.0,
    date: new Date("2022-07-29"),
  },
  {
    id: "e5",
    title: "Python Programming",
    amount: 129.0,
    date: new Date("2022-07-18"),
  },
  {
    id: "e6",
    title: "Java Masterclass",
    amount: 199.0,
    date: new Date("2022-07-14"),
  },
  {
    id: "e7",
    title: "Svelte by Rich Harris",
    amount: 299.0,
    date: new Date("2022-07-10"),
  },
  {
    id: "e8",
    title: "Mop",
    amount: 120.0,
    date: new Date("2022-07-08"),
  },
  {
    id: "e9",
    title: "Bunch of flowers",
    amount: 70.0,
    date: new Date("2022-01-02"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ title, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { title, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];

    case "UPDATE":
      // Find the index of the expense to be updated
      const index = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      // Pull out the expense to be updated using the index above
      const expenseToUpdate = state[index];
      // Update the expense pulled above with the incoming data
      const updatedExpense = { ...expenseToUpdate, ...action.payload.data };
      // Make copy of existing state
      const updatedExpenses = [...state];
      // Take the updated expense from 2 steps above and assign it to the expense that needs to tbe updated
      updatedExpenses[index] = updatedExpense;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
