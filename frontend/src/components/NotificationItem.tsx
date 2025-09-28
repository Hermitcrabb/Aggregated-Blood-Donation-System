import React from "react";
import { StyleSheet, Text } from "react-native";
import { NotificationMessage } from "@types/index";
import { useAppTheme } from "@theme/ThemeProvider";
import { Card } from "./Card";
import { formatRelativeTime } from "@utils/format";

interface NotificationItemProps {
  notification: NotificationMessage;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { colors } = useAppTheme();

  const toneBackground: Record<string, string> = {
    urgent: "rgba(215, 38, 56, 0.12)",
    event: "rgba(2, 136, 209, 0.12)",
    celebration: "rgba(46, 125, 50, 0.12)",
    system: "rgba(53, 53, 53, 0.08)"
  };

  return (
    <Card backgroundColor={toneBackground[notification.type]} elevated={false} style={styles.container}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{notification.title}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>{notification.description}</Text>
      <Text style={[styles.timestamp, { color: colors.textSecondary }]}>{formatRelativeTime(notification.timestamp)}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6
  },
  description: {
    fontSize: 14,
    marginBottom: 4
  },
  timestamp: {
    fontSize: 12
  }
});
