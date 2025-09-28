import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScreenContainer } from "@components/ScreenContainer";
import { useAppTheme } from "@theme/ThemeProvider";
import { useDataContext } from "@context/DataContext";
import { SectionHeader } from "@components/SectionHeader";

const bloodGroups = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];

export const DonorRegistrationScreen: React.FC = () => {
  const { colors, spacing, radius } = useAppTheme();
  const { registerDonor } = useDataContext();

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bloodType, setBloodType] = useState("O+");
  const [lastDonation, setLastDonation] = useState("2024-01-01");
  const [donationsCount, setDonationsCount] = useState("0");

  const resetForm = () => {
    setName("");
    setCity("");
    setPhone("");
    setEmail("");
    setBloodType("O+");
    setLastDonation("2024-01-01");
    setDonationsCount("0");
  };

  const handleRegister = () => {
    if (!name || !city || !phone || !email) {
      Alert.alert("Missing details", "Please complete all mandatory fields.");
      return;
    }

    registerDonor({
      name,
      city,
      phone,
      email,
      bloodType,
      lastDonation,
      donationsCount: Number(donationsCount),
      distanceInKm: Math.round(Math.random() * 20) + 1,
      availability: "Available"
    });

    Alert.alert("Donor registered", `${name} has been added to the donor network.`);
    resetForm();
  };

  return (
    <ScreenContainer>
      <SectionHeader title="Become a donor" />
      <Text style={{ color: colors.textSecondary, marginBottom: spacing.md }}>
        Register to donate blood and earn priority points for your contributions. Hospitals and NGOs will be able to reach you instantly when there is a matching request.
      </Text>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Full name</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.textPrimary, borderColor: colors.border, borderRadius: radius.md }]}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>City</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.textPrimary, borderColor: colors.border, borderRadius: radius.md }]}
          value={city}
          onChangeText={setCity}
          placeholder="City of residence"
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.formGroupHalf}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Blood group</Text>
          <View style={[styles.pillGroup, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radius.md }]}
          >
            {bloodGroups.map((group) => (
              <TouchableOpacity
                key={group}
                style={[styles.pill, { backgroundColor: bloodType === group ? colors.primary : "transparent" }]}
                onPress={() => setBloodType(group)}
              >
                <Text style={{ color: bloodType === group ? colors.textOnPrimary : colors.textSecondary }}>{group}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Last donation (YYYY-MM-DD)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, color: colors.textPrimary, borderColor: colors.border, borderRadius: radius.md }]}
            value={lastDonation}
            onChangeText={setLastDonation}
            placeholder="2024-04-20"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.formGroupHalf}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Phone</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, color: colors.textPrimary, borderColor: colors.border, borderRadius: radius.md }]}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone number"
            keyboardType="phone-pad"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        <View style={styles.formGroupHalf}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.surface, color: colors.textPrimary, borderColor: colors.border, borderRadius: radius.md }]}
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            keyboardType="email-address"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Lifetime donations</Text>
        <TextInput
          style={[styles.input, { backgroundColor: colors.surface, color: colors.textPrimary, borderColor: colors.border, borderRadius: radius.md }]}
          value={donationsCount}
          onChangeText={setDonationsCount}
          placeholder="0"
          keyboardType="numeric"
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <TouchableOpacity style={[styles.submitButton, { backgroundColor: colors.primary, borderRadius: radius.lg }]} onPress={handleRegister}
      >
        <Text style={{ color: colors.textOnPrimary, fontWeight: "700" }}>Register now</Text>
      </TouchableOpacity>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 16
  },
  formGroupHalf: {
    flex: 1,
    marginBottom: 16
  },
  label: {
    marginBottom: 6,
    fontWeight: "600"
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12
  },
  pillGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: StyleSheet.hairlineWidth,
    padding: 6
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    borderRadius: 999
  },
  submitButton: {
    marginTop: 12,
    paddingVertical: 16,
    alignItems: "center"
  }
});
