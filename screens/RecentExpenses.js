import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

const RecentExpenses = () => {
  return <ExpensesOutput period="Last 7 days" />;
};

export default RecentExpenses;

const styles = StyleSheet.create({});
