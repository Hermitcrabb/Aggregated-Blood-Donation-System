import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@components/ScreenContainer";
import { SectionHeader } from "@components/SectionHeader";
import { StatTile } from "@components/StatTile";
import { useAppTheme } from "@theme/ThemeProvider";
import { useDataContext } from "@context/DataContext";
import { BloodRequestCard } from "@components/BloodRequestCard";

export const AdminDashboardScreen: React.FC = () => {
  const { colors } = useAppTheme();
  const { donors, requests, prioritizedDonors, donorsByBloodType } = useDataContext();

  const summary = useMemo(() => {
    const totalPoints = donors.reduce((sum, donor) => sum + donor.points, 0);
    const highPriorityCases = requests.filter((request) => request.status === "Escalated" || request.urgency === "Critical");
    const fulfilled = requests.filter((request) => request.status === "Fulfilled");
    const fulfillmentRate = requests.length === 0 ? 0 : Math.round((fulfilled.length / requests.length) * 100);

    return {
      totalPoints,
      highPriorityCases,
      fulfillmentRate
    };
  }, [donors, requests]);

  return (
    <ScreenContainer>
      <SectionHeader title="Admin dashboard" />
      <Text style={{ color: colors.textSecondary, marginBottom: 16 }}>
        Monitor donor engagement, blood bank performance and outstanding requests. Integrate with microservices to sync inventory and compliance metrics.
      </Text>

      <View style={styles.statRow}>
        <StatTile label="Registered donors" value={donors.length} helper="Across all partner regions" tone="primary" />
        <StatTile label="Avg donor points" value={Math.round(summary.totalPoints / donors.length || 0)} helper="Reward top donors" tone="default" />
      </View>
      <View style={styles.statRow}>
        <StatTile label="High priority" value={summary.highPriorityCases.length} helper="Escalated or critical" tone="warning" />
        <StatTile label="Fulfilment rate" value={`${summary.fulfillmentRate}%`} helper="Last 30 days" tone="success" />
      </View>

      <SectionHeader title="Inventory snapshot" />
      {Object.entries(donorsByBloodType).map(([bloodType, group]) => (
        <View key={bloodType} style={[styles.inventoryRow, { borderColor: colors.border }]}
        >
          <Text style={[styles.inventoryType, { color: colors.textPrimary }]}>{bloodType}</Text>
          <Text style={{ color: colors.textSecondary }}>{group.length} donors</Text>
          <Text style={{ color: colors.textSecondary }}>{Math.round(group.reduce((sum, donor) => sum + donor.points, 0) / group.length)} pts avg</Text>
        </View>
      ))}

      <SectionHeader title="Escalated cases" />
      {summary.highPriorityCases.length === 0 ? (
        <Text style={{ color: colors.textSecondary }}>No escalated cases at the moment.</Text>
      ) : (
        summary.highPriorityCases.map((request) => <BloodRequestCard key={request.id} request={request} />)
      )}

      <SectionHeader title="Top contributors" />
      {prioritizedDonors.slice(0, 5).map((donor) => (
        <View key={donor.id} style={[styles.contributorRow, { borderColor: colors.border }]}
        >
          <View>
            <Text style={[styles.contributorName, { color: colors.textPrimary }]}>{donor.name}</Text>
            <Text style={{ color: colors.textSecondary }}>{donor.city} • {donor.bloodType}</Text>
          </View>
          <Text style={[styles.contributorPoints, { color: colors.primaryDark }]}>{donor.points} pts</Text>
        </View>
      ))}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  statRow: {
    flexDirection: "row",
    marginBottom: 16
  },
  inventoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10
  },
  inventoryType: {
    fontSize: 16,
    fontWeight: "700"
  },
  contributorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12
  },
  contributorName: {
    fontSize: 16,
    fontWeight: "700"
  },
  contributorPoints: {
    fontSize: 16,
    fontWeight: "700"
  }
});
