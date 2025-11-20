import { ReactElement, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  Text,
} from "react-native";
import NewBudgetEntry from "../components/NewBudgetEntry";
import IconButton from "../components/IconButton";
import * as SQLite from "expo-sqlite";
import BudgetListItem from "../components/BudgetListItem";

const database = SQLite.openDatabaseSync("budget.db");

type BudgetEntry = {
  id?: number;
  seller: string;
  category: string;
  amount: number;
  date: string;
};

/**
 * Screen for the budgetlist.
 *
 * @returns
 */
export default function BudgetScreen(): ReactElement {
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [budgetEntries, setBudgetEntries] = useState<BudgetEntry[]>([]);
  const [isLoading, setLoadig] = useState(true);

  useEffect(() => {
    initDB();
    loadEntries();
  }, []);

  /**
   * Init and create table if not exists.
   */
  function initDB() {
    database.runSync(
      "CREATE TABLE IF NOT EXISTS budgetEntries (id INTEGER PRIMARY KEY NOT NULL, seller TEXT, category TEXT, amount NUMERIC, date TEXT, isSynced NUMERIC);"
    );
  }

  /**
   * Save the entry into the database.
   *
   * @param seller
   * @param category
   * @param amount
   * @param date
   */
  async function saveEntry(
    seller: string,
    category: string,
    amount: number,
    date: string,
    newBudgetEntries: {
      id?: number;
      seller: string;
      category: string;
      amount: number;
      date: string;
    }[]
  ) {
    const toDatabaseDate = (date: string): string => {
      const [day, month, year] = date.split(".");
      return `${year}-${month}-${day}`;
    };

    const result = await database.runAsync(
      "INSERT INTO budgetEntries (seller, category, amount, date, isSynced) VALUES (?,?,?,?,?)",
      [seller, category, amount, toDatabaseDate(date), 0]
    );
    newBudgetEntries[newBudgetEntries.length - 1].id = result.lastInsertRowId;
    setBudgetEntries(newBudgetEntries);
  }

  /**
   * Load entries from database.
   */
  async function loadEntries() {
    //Lade einträge aus der tabelle
    const rows = await database.getAllAsync<BudgetEntry>(
      "SELECT * FROM budgetEntries WHERE isSynced == 0"
    );
    setBudgetEntries(rows);
    setLoadig(false);
  }

  /**
   * Add the new budgetEntry.
   *
   * @param seller
   * @param category
   * @param amount
   * @param date
   */
  function addBudgetEntry(
    seller: string,
    category: string,
    amount: number,
    date: string
  ) {
    setShowNewDialog(false);

    const newBudgetEntries = [
      ...budgetEntries,
      { seller, category, amount, date },
    ];
    setBudgetEntries(newBudgetEntries);

    saveEntry(seller, category, amount, date, newBudgetEntries);
  }

  /**
   *
   */
  function removeEntryFromDb() {
    // const id: number = budgetEntries[0].id;
    // database.runAsync("DELETE FROM budgetEntries WHERE id=?", id);
  }

  /**
   *
   */
  function deleteEntry() {
    Alert.alert(
      "Eintrag löschen",
      "Soll der Eintrag wirklich gelöscht werden?",
      [
        { text: "Abbrechen", style: "cancel" },
        {
          text: "Bestätigen",
          style: "destructive",
          onPress: removeEntryFromDb,
        },
      ]
    );
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="darkslateblue" />
      </View>
    );
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
      <FlatList
        data={budgetEntries}
        renderItem={({ item }) => <BudgetListItem item={item} />}
        refreshing={isLoading}
        onRefresh={loadEntries}
        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
        ListEmptyComponent={
          <Text style={styles.listEmpty}>Keine Daten geladen</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    color: "black",
  },
  new: {
    position: "absolute",
    top: 60,
    right: 30,
  },
  listSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "lightsalmon",
  },
  listEmpty: {
    fontSize: 32,
    paddingTop: 100,
    textAlign: "center",
  },
});
