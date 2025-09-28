import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { useAppTheme } from "@theme/ThemeProvider";

interface SectionHeaderProps {
  title: string;
  action?: React.ReactNode;
  style?: ViewStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, action, style }) => {
  const { colors, typography, spacing } = useAppTheme();
  return (
    <View style={[styles.container, { marginBottom: spacing.sm }, style]}>
      <Text style={[styles.title, { color: colors.textPrimary, fontSize: typography.subtitle }]}>
        {title}
      </Text>
      {action}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontWeight: "700"
  }
});
