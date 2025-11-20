import { ReactElement, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";
import BigButton from "./BigButton";
import IconButton from "./IconButton";

/** Typdefinition der Props */
type NewBudgetEntryProps = {
  visible: boolean;
  onCancel: () => void;
  onSave: (
    seller: string,
    category: string,
    amount: number,
    date: string
  ) => void;
};

export default function NewBudgetEntry({
  visible,
  onCancel,
  onSave,
}: NewBudgetEntryProps): ReactElement {
  const [amount, setAmount] = useState("");
  const [seller, setSeller] = useState("");
  const [category, setCategory] = useState("");

  const formatDisplayDate = (d: Date) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
  };
  const [date, setDate] = useState(formatDisplayDate(new Date()));

  function saveBudgetEntry() {
    const newAmount =
      amount.trim() === "" ? 0 : parseFloat(amount.trim().replace(",", "."));
    const newDate = date.trim();
    const newSeller = seller.trim();
    const newCategory = category.trim();
    if (
      newAmount === 0 ||
      newDate === "" ||
      newSeller === "" ||
      newCategory === ""
    ) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }
    onSave(newSeller, newCategory, newAmount, newDate);
    setAmount("");
    setDate(formatDisplayDate(new Date()));
    setSeller("");
    setCategory("");
  }

  function cancelEditing() {
    onCancel();
    setAmount("");
    setDate(formatDisplayDate(new Date()));
    setSeller("");
    setCategory("");
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={cancelEditing}
      animationType="slide"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <IconButton
          icon="arrow-back"
          onPress={cancelEditing}
          style={styles.back}
        />
        <TextInput
          placeholder="Verkäufer"
          onChangeText={setSeller}
          style={styles.input}
        />
        <TextInput
          placeholder="Kategorie"
          onChangeText={setCategory}
          style={styles.input}
        />
        <TextInput
          placeholder="Betrag"
          onChangeText={setAmount}
          style={styles.input}
        />
        <TextInput
          placeholder="Datum"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />
        <BigButton
          title="Speichern"
          onPress={saveBudgetEntry}
          style={styles.left}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "darkslateblue",
    borderRadius: 5,
    width: "80%",
    marginBottom: 10,
    padding: 10,
    fontSize: 20,
  },
  contentInput: {
    height: 150,
    textAlignVertical: "top",
  },
  left: {},
  back: {
    position: "absolute",
    top: 60,
    left: 30,
  },
});
function alert(arg0: string) {
  throw new Error("Function not implemented.");
}
