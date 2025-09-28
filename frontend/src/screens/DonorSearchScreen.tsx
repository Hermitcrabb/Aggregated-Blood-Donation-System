import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScreenContainer } from "@components/ScreenContainer";
import { SearchFilterBar } from "@components/SearchFilterBar";
import { DonorCard } from "@components/DonorCard";
import { SectionHeader } from "@components/SectionHeader";
import { useAppTheme } from "@theme/ThemeProvider";
import { useDataContext } from "@context/DataContext";
import { EmptyState } from "@components/EmptyState";

const bloodGroups = ["All", "O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

export const DonorSearchScreen: React.FC = () => {
  const { colors, radius } = useAppTheme();
  const { donors } = useDataContext();
  const [query, setQuery] = useState("");
  const [bloodFilter, setBloodFilter] = useState<string>("All");
  const [sortByPoints, setSortByPoints] = useState(true);

  const visibleDonors = useMemo(() => {
    let list = donors.filter((donor) => {
      const matchesQuery = `${donor.name} ${donor.city} ${donor.bloodType}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesBlood = bloodFilter === "All" || donor.bloodType === bloodFilter;
      return matchesQuery && matchesBlood;
    });

    list = list.filter((donor) => donor.availability === "Available");

    return list.sort((a, b) => (sortByPoints ? b.points - a.points : a.distanceInKm - b.distanceInKm));
  }, [donors, query, bloodFilter, sortByPoints]);

  return (
    <ScreenContainer>
      <SectionHeader title="Find donors" />
      <SearchFilterBar value={query} onChange={setQuery} placeholder="Search by name, city or blood type" />

      <View style={styles.bloodFilterRow}>
        {bloodGroups.map((group) => (
          <TouchableOpacity
            key={group}
            style={[
              styles.bloodFilter,
              {
                backgroundColor: bloodFilter === group ? colors.primary : "transparent",
                borderColor: colors.primary,
                borderRadius: radius.md
              }
            ]}
            onPress={() => setBloodFilter(group)}
          >
            <Text style={{ color: bloodFilter === group ? colors.textOnPrimary : colors.primary }}>{group}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sortToggle}>
        <TouchableOpacity
          style={[
            styles.sortButton,
            { backgroundColor: sortByPoints ? colors.primary : "transparent", borderColor: colors.primary, marginRight: 12 }
          ]}
          onPress={() => setSortByPoints(true)}
        >
          <Text style={{ color: sortByPoints ? colors.textOnPrimary : colors.primary }}>Highest points</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            { backgroundColor: !sortByPoints ? colors.primary : "transparent", borderColor: colors.primary, marginRight: 0 }
          ]}
          onPress={() => setSortByPoints(false)}
        >
          <Text style={{ color: !sortByPoints ? colors.textOnPrimary : colors.primary }}>Closest distance</Text>
        </TouchableOpacity>
      </View>

      {visibleDonors.length === 0 ? (
        <EmptyState
          title="No donors available"
          description="Try adjusting your filters or invite more donors to sign up in this area."
        />
      ) : (
        visibleDonors.map((donor) => <DonorCard key={donor.id} donor={donor} />)
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  bloodFilterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12
  },
  bloodFilter: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1
  },
  sortToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16
  },
  sortButton: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1,
    alignItems: "center"
  }
});
