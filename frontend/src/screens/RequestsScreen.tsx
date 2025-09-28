import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScreenContainer } from "@components/ScreenContainer";
import { BloodRequestCard } from "@components/BloodRequestCard";
import { SectionHeader } from "@components/SectionHeader";
import { useAppTheme } from "@theme/ThemeProvider";
import { useDataContext } from "@context/DataContext";
import { EmptyState } from "@components/EmptyState";
import { RequestStatus } from "@types/index";

const filters: RequestStatus[] = ["Open", "Escalated", "Matched", "Fulfilled"];

export const RequestsScreen: React.FC = () => {
  const { colors, radius, spacing } = useAppTheme();
  const { requests } = useDataContext();
  const [activeFilter, setActiveFilter] = useState<RequestStatus | "All">("Open");

  const filteredRequests = useMemo(() => {
    if (activeFilter === "All") {
      return requests;
    }
    return requests.filter((request) => request.status === activeFilter);
  }, [activeFilter, requests]);

  return (
    <ScreenContainer>
      <SectionHeader title="Blood requests" />
      <Text style={{ color: colors.textSecondary, marginBottom: spacing.md }}>
        Real-time requests from partner hospitals, NGOs and clinics. Prioritize critical cases and match donors efficiently.
      </Text>

      <View style={styles.filterRow}>
        {["All", ...filters].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              {
                backgroundColor: activeFilter === filter ? colors.primary : "transparent",
                borderColor: colors.primary,
                borderRadius: radius.md
              }
            ]}
            onPress={() => setActiveFilter(filter as RequestStatus | "All")}
          >
            <Text style={{ color: activeFilter === filter ? colors.textOnPrimary : colors.primary, fontWeight: "600" }}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredRequests.length === 0 ? (
        <EmptyState title="No requests" description="There are no requests in this category right now." />
      ) : (
        filteredRequests.map((request) => <BloodRequestCard key={request.id} request={request} />)
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1
  }
});
