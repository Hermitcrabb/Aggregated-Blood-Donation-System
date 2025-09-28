import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { useAppTheme } from "@theme/ThemeProvider";

interface StatusBadgeProps {
  label: string;
  tone?: "default" | "success" | "warning" | "critical" | "info";
  style?: ViewStyle;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label, tone = "default", style }) => {
  const { colors } = useAppTheme();

  const backgroundByTone: Record<string, string> = {
    default: colors.surfaceMuted,
    success: "rgba(46, 125, 50, 0.1)",
    warning: "rgba(249, 168, 37, 0.1)",
    critical: "rgba(215, 38, 56, 0.15)",
    info: "rgba(2, 136, 209, 0.12)"
  };

  const textByTone: Record<string, string> = {
    default: colors.primary,
    success: colors.success,
    warning: colors.warning,
    critical: colors.primaryDark,
    info: colors.info
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundByTone[tone] }, style]}>
      <Text style={{ color: textByTone[tone], fontWeight: "600" }}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginVertical: 4
  }
});
