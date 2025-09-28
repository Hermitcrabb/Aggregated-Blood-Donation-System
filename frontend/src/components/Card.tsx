import React, { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useAppTheme } from "@theme/ThemeProvider";

interface CardProps extends PropsWithChildren {
  elevated?: boolean;
  style?: ViewStyle;
  backgroundColor?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = true,
  style,
  backgroundColor
}) => {
  const { colors, radius } = useAppTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor ?? colors.surface,
          shadowOpacity: elevated ? 0.1 : 0,
          elevation: elevated ? 2 : 0,
          borderColor: colors.border,
          borderWidth: elevated ? 0 : StyleSheet.hairlineWidth,
          borderRadius: radius.md
        },
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6
  }
});
