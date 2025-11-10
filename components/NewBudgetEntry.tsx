import { ReactElement, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import BigButton from "./BigButton";
import IconButton from "./IconButton";

/** Typdefinition der Props */
type NewBudgetEntryProps = {
  visible: boolean;
  onCancel: () => void;
  onSave: () => void;
};

export default function NewBudgetEntry({
  visible,
  onCancel,
  onSave,
}: NewBudgetEntryProps): ReactElement {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  function saveBudgetEntry() {
    const newAmount = amount.trim();
    const newDate = date.trim();
    const newDescription = description.trim();
    const newCategory = category.trim();
    if (
      newAmount === "" ||
      newDate === "" ||
      newDescription === "" ||
      newCategory === ""
    ) {
      alert("Bitte alle Felder ausfüllen!");
      return;
    }
    onSave();
    setAmount("");
    setDate("");
    setDescription("");
    setCategory("");
  }

  function cancelEditing() {
    onCancel();
    setAmount("");
    setDate("");
    setDescription("");
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
          placeholder="Datum"
          onChangeText={setDate}
          style={styles.input}
        />
        <TextInput
          placeholder="Betrag"
          onChangeText={setAmount}
          style={styles.input}
        />
        <TextInput
          placeholder="Bezeichnung"
          onChangeText={setDescription}
          style={styles.input}
        />
        <TextInput
          placeholder="Kategorie"
          onChangeText={setCategory}
          onSubmitEditing={saveBudgetEntry}
          returnKeyType="done"
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
