import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Donor } from "@types/index";
import { useAppTheme } from "@theme/ThemeProvider";
import { Card } from "./Card";
import { StatusBadge } from "./StatusBadge";
import { bloodTypeColor } from "@utils/format";

interface DonorCardProps {
  donor: Donor;
}

export const DonorCard: React.FC<DonorCardProps> = ({ donor }) => {
  const { colors } = useAppTheme();

  return (
    <Card style={styles.container}>
      <View style={styles.header}>
        <View style={styles.nameBlock}>
          <Text style={[styles.name, { color: colors.textPrimary }]}>{donor.name}</Text>
          <Text style={[styles.city, { color: colors.textSecondary }]}>{donor.city}</Text>
        </View>
        <View style={[styles.bloodTag, { backgroundColor: bloodTypeColor(donor.bloodType) }]}
        >
          <Text style={styles.bloodTagText}>{donor.bloodType}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Text style={[styles.meta, { color: colors.textSecondary }]}>Distance: {donor.distanceInKm} km</Text>
        <Text style={[styles.meta, { color: colors.textSecondary }]}>Donations: {donor.donationsCount}</Text>
      </View>

      <View style={styles.metaRow}>
        <Text style={[styles.meta, { color: colors.textSecondary }]}>Last donation: {donor.lastDonation}</Text>
        <Text style={[styles.points, { color: colors.primaryDark }]}>{donor.points} pts</Text>
      </View>

      <StatusBadge
        label={donor.availability}
        tone={donor.availability === "Available" ? "success" : donor.availability === "Away" ? "warning" : "default"}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8
  },
  nameBlock: {
    flex: 1,
    marginRight: 12
  },
  name: {
    fontSize: 18,
    fontWeight: "700"
  },
  city: {
    fontSize: 14
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4
  },
  meta: {
    fontSize: 14
  },
  points: {
    fontSize: 14,
    fontWeight: "700"
  },
  bloodTag: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10
  },
  bloodTagText: {
    color: "#fff",
    fontWeight: "700"
  }
});
