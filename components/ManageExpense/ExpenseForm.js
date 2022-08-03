import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Button from "../UI/Button";
import Input from "./Input";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({
  cancelHandler,
  confirmHandler,
  submitButtonLabel,
  selectedExpense,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: selectedExpense ? selectedExpense.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: selectedExpense ? getFormattedDate(selectedExpense.date) : "",
      isValid: true,
    },
    title: {
      value: selectedExpense ? selectedExpense.title : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: true,
        },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value, //+ converts string to number
      date: new Date(inputs.date.value),
      title: inputs.title.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const titleIsValid = expenseData.title.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !titleIsValid) {
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          title: { value: currentInputs.title.value, isValid: titleIsValid },
        };
      });
      return;
    }
    confirmHandler(expenseData);
  }

  const formIsValid =
    !inputs.amount.isValid || !inputs.date.isValid || !inputs.title.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>You Expense</Text>
      <Input
        label="Title"
        invalid={!inputs.title.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: inputChangeHandler.bind(this, "title"),
          value: inputs.title.value,
        }}
      />
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
      </View>
      {formIsValid && (
        <Text style={styles.errorText}>Invalid input values</Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: 24,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    margin: 8,
    color: GlobalStyles.colors.error500,
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
  },
});
