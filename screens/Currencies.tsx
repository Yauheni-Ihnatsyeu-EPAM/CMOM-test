import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

import CurrenciesList from "../components/CurrenciesList";

import { RootTabScreenProps } from "../types";

export default function Currencies({
  navigation,
}: RootTabScreenProps<"Currencies">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currencies List</Text>
      <View style={styles.separator} />
      <CurrenciesList path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
