import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "@theme/ThemeProvider";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description }) => {
  const { colors } = useAppTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      {description && <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6
  },
  description: {
    textAlign: "center",
    maxWidth: 280
  }
});
