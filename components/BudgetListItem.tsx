import { Pressable, StyleSheet, Text, View } from "react-native";

export type BudgetEntry = {
  id?: number;
  vendor: string;
  category: string;
  amount: number;
  date: string;
  debitAccount: string;
};

export type BudgetListItemProps = {
  item: BudgetEntry;
};

/**
 *
 * @param param0
 * @returns
 */
export default function BudgetListItem({ item }: BudgetListItemProps) {
  return (
    <Pressable style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.vendor}>
          {item.vendor} ({item.category})
        </Text>
        <Text style={styles.amount}>
          {item.amount} ({item.date})
        </Text>
        <Text style={styles.amount}>{item.debitAccount}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 70,
    padding: 10,
  },
  info: {
    justifyContent: "space-evenly",
  },
  vendor: {
    fontSize: 20,
  },
  amount: {
    fontSize: 16,
    fontWeight: "100",
  },
  image: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
});
