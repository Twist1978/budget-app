import { ReactElement } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";

/**
 *
 * @returns
 */
export default function SettingsScreen(): ReactElement {
  return (
    <View style={styles.container}>
      <Text>Später Konfiguration der API Und Zugangsdaten</Text>
      <SectionList
        sections={[
          { title: "Version", data: [{ name: "1.0" }] },
          {
            title: "Impressum",
            data: [{ name: "Firma Twist" }, { name: "(c) 2025" }],
          },
        ]}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        renderSectionHeader={({ section }) => (
          <Text style={styles.section}>{section.title}</Text>
        )}
      ></SectionList>
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
  },
  section: {
    backgroundColor: "whitesmoke",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgrey",
    fontSize: 18,
    padding: 5,
  },
});
