import { ReactElement, useState } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import NewBudgetEntry from "../components/newBudgetEntry";
import IconButton from "../components/IconButton";

/**
 *
 * @returns
 */
export default function BudgetScreen(): ReactElement {
  const [showNewDialog, setShowNewDialog] = useState(false);

  function addBudgetEntry() {
    setShowNewDialog(false);
  }

  return (
    <View style={styles.container}>
      <IconButton
        icon="add-circle"
        onPress={() => setShowNewDialog(true)}
        style={styles.new}
      />
      <NewBudgetEntry
        visible={showNewDialog}
        onCancel={() => setShowNewDialog(false)}
        onSave={addBudgetEntry}
      />
      <Text>
        Liste der lokal gespeicherten einträge (noch nicht syncronisiert)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    color: "black",
  },
  new: {
    position: "absolute",
    top: 60,
    right: 30,
  },
});
