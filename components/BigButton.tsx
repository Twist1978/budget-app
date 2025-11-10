import {
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";

/** Typdefinition der Props */
type BigButtonProps = {
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>;
};

export default function BigButton({ onPress, title, style }: BigButtonProps) {
  return (
    <Pressable onPress={onPress} style={[style, styles.button]}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 3,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "darkslateblue",
  },
  title: {
    color: "white",
    fontWeight: "700",
  },
});
