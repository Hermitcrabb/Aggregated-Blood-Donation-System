import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "./Card";
import { useAppTheme } from "@theme/ThemeProvider";

interface StatTileProps {
  label: string;
  value: string | number;
  helper?: string;
  tone?: "default" | "primary" | "success" | "warning";
}

export const StatTile: React.FC<StatTileProps> = ({ label, value, helper, tone = "default" }) => {
  const { colors } = useAppTheme();

  const toneBackground: Record<string, string> = {
    default: colors.surface,
    primary: "rgba(138, 3, 3, 0.08)",
    success: "rgba(46, 125, 50, 0.1)",
    warning: "rgba(249, 168, 37, 0.1)"
  };

  const toneColor: Record<string, string> = {
    default: colors.textPrimary,
    primary: colors.primaryDark,
    success: colors.success,
    warning: colors.warning
  };

  return (
    <Card backgroundColor={toneBackground[tone]} elevated={false} style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.value, { color: toneColor[tone] }]}>{value}</Text>
      {helper && <Text style={[styles.helper, { color: colors.textSecondary }]}>{helper}</Text>}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 12
  },
  label: {
    fontSize: 14,
    marginBottom: 4
  },
  value: {
    fontSize: 24,
    fontWeight: "700"
  },
  helper: {
    marginTop: 6
  }
});
