import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BloodRequest } from "@types/index";
import { useAppTheme } from "@theme/ThemeProvider";
import { Card } from "./Card";
import { StatusBadge } from "./StatusBadge";
import { formatDate, formatTime } from "@utils/format";

interface BloodRequestCardProps {
  request: BloodRequest;
}

export const BloodRequestCard: React.FC<BloodRequestCardProps> = ({ request }) => {
  const { colors } = useAppTheme();

  const tone = request.urgency === "Critical" ? "critical" : request.urgency === "High" ? "warning" : "info";

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.hospital, { color: colors.textPrimary }]}>{request.hospital}</Text>
        <StatusBadge label={request.status} tone={request.status === "Open" ? "warning" : "success"} />
      </View>

      <Text style={[styles.city, { color: colors.textSecondary }]}>{request.city}</Text>

      <View style={styles.detailsRow}>
        <StatusBadge label={`${request.bloodType}`} tone={tone} />
        <Text style={[styles.units, { color: colors.textSecondary }]}>
          {request.unitsRequired} units
        </Text>
      </View>

      <Text style={[styles.timestamp, { color: colors.textSecondary }]}>Requested {formatDate(request.requestedOn)} • {formatTime(request.requestedOn)}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6
  },
  hospital: {
    fontSize: 18,
    fontWeight: "700"
  },
  city: {
    marginBottom: 8
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  units: {
    fontSize: 15,
    fontWeight: "600"
  },
  timestamp: {
    marginTop: 10,
    fontSize: 13
  }
});
