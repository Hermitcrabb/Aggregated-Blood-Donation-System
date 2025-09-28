import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@components/ScreenContainer";
import { SectionHeader } from "@components/SectionHeader";
import { BloodRequestCard } from "@components/BloodRequestCard";
import { DonorCard } from "@components/DonorCard";
import { StatTile } from "@components/StatTile";
import { useAppTheme } from "@theme/ThemeProvider";
import { useDataContext } from "@context/DataContext";
import { useRealTimeUpdates } from "@hooks/useRealTimeUpdates";

export const HomeScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const { prioritizedDonors, requests, drives } = useDataContext();
  useRealTimeUpdates();

  const urgentRequests = requests.filter(
    (request) => ["High", "Critical"].includes(request.urgency) || request.status === "Escalated"
  );
  const openRequests = requests.filter((request) => request.status === "Open" || request.status === "Escalated");

  return (
    <ScreenContainer>
      <View style={[styles.hero, { backgroundColor: colors.primaryDark }]}>
        <Text style={[styles.heroTitle, { color: colors.textOnPrimary }]}>Aggregated Blood Donation</Text>
        <Text style={[styles.heroSubtitle, { color: colors.textOnPrimary }]}>
          Connect donors, hospitals, NGOs and clinics in real time.
        </Text>
      </View>

      <View style={styles.statsRow}>
        <StatTile label="Open requests" value={openRequests.length} helper="Across connected partners" tone="warning" />
        <StatTile label="Active donors" value={prioritizedDonors.length} helper="Verified profiles" tone="primary" />
      </View>

      <SectionHeader title="Urgent blood requirements" />
      {urgentRequests.length === 0 ? (
        <Text style={{ color: colors.textSecondary }}>No urgent requirements right now. Stay prepared!</Text>
      ) : (
        urgentRequests.map((request) => <BloodRequestCard key={request.id} request={request} />)
      )}

      <SectionHeader title="Top donors" />
      {prioritizedDonors.slice(0, 3).map((donor) => (
        <DonorCard key={donor.id} donor={donor} />
      ))}

      <SectionHeader title="Upcoming drives" />
      {drives.map((drive) => (
        <View key={drive.id} style={[styles.driveCard, { borderColor: colors.border }]}>
          <Text style={[styles.driveTitle, { color: colors.textPrimary }]}>{drive.title}</Text>
          <Text style={{ color: colors.textSecondary }}>{drive.location}</Text>
          <Text style={{ color: colors.textSecondary }}>{drive.date}</Text>
          <Text style={{ color: colors.textSecondary }}>Organized by {drive.organizer}</Text>
        </View>
      ))}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  hero: {
    padding: 24,
    borderRadius: 20,
    marginBottom: 24
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 8
  },
  heroSubtitle: {
    fontSize: 16,
    opacity: 0.92
  },
  statsRow: {
    flexDirection: "row",
    marginBottom: 24
  },
  driveCard: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12
  },
  driveTitle: {
    fontSize: 18,
    fontWeight: "700"
  }
});
