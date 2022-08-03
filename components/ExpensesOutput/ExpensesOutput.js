import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

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
    date: new Date("2022-07-22"),
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

const ExpensesOutput = ({ expenses, period }) => {
  return (
    <View style={styles.container}>
      {/* SUMMARY */}
      <ExpensesSummary period={period} expenses={DUMMY_EXPENSES} />
      {/* LIST OF EXPENSES */}
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
