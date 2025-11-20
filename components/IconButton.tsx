import { Pressable, StyleProp, ViewStyle } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

/** Typdefinition der Props */
type IconButtonProps = {
  onPress: () => void;
  icon: keyof typeof MaterialIcons.glyphMap;
  style?: StyleProp<ViewStyle>;
};

export default function IconButton({ onPress, icon, style }: IconButtonProps) {
  return (
    <Pressable onPress={onPress} style={style}>
      <MaterialIcons name={icon} size={36} color="darkslateblue" />
    </Pressable>
  );
}
