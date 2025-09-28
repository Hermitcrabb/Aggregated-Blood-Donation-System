import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useAppTheme } from "@theme/ThemeProvider";

interface SearchFilterBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({ value, onChange, placeholder }) => {
  const { colors, spacing, radius } = useAppTheme();
  return (
    <View style={[styles.container, { marginBottom: spacing.md }]}> 
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            color: colors.textPrimary,
            borderRadius: radius.md
          }
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder ?? "Search donors"}
        placeholderTextColor={colors.textSecondary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
    fontSize: 16
  }
});
