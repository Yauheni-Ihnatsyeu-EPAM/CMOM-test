import { NavigationProp } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as React from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  Linking,
} from "react-native";
import WebView, { WebViewNavigation } from "react-native-webview";

import CurrenciesList from "../components/CurrenciesList";
import { CurrencyInfo } from "../components/types";
import { useCoinsQuery } from "../hooks/useCoinsQuery";
import { RootTabParamList } from "../types";

export default function Currency({
  route,
}: NativeStackScreenProps<RootTabParamList, "Currency">) {
  const { coinId } = route.params;

  const webviewRef: React.RefObject<WebView> = React.createRef();

  const { data, loading } = useCoinsQuery<CurrencyInfo>(`/${coinId}`);

  const handleWebviewClick = (newState: WebViewNavigation) => {
    Linking.openURL(newState.url);
    if (newState.url != "about:blank") webviewRef?.current?.stopLoading();
  };

  const renderCurrency = (data: CurrencyInfo) => {
    const linkPress = (url: string) => {
      Linking.openURL(url);
    };

    console.log(data);
    return (
      <View style={{ padding: 50, flex: 1 }}>
        <Text style={{ fontSize: 48 }}>
          {data.name}{" "}
          <Text style={{ fontSize: 38, fontStyle: "italic" }}>
            {" "}
            {data?.symbol}
          </Text>
        </Text>

        <Text style={{ fontSize: 30 }}>
          hashing algo {data?.hashing_algorithm}
        </Text>
        <Text style={{ fontSize: 30 }}>
          market cap {data?.market_data.market_cap?.eur} €
        </Text>

        <Text style={{ fontSize: 30 }}>genesis date: {data?.genesis_date}</Text>

        <Text
          onPress={(event) => {
            linkPress(data.links.homepage[0]);
          }}
          style={{ fontSize: 30, color: "blue" }}
        >
          Homepage{" "}
        </Text>
        <WebView
          ref={webviewRef}
          onNavigationStateChange={handleWebviewClick}
          originWhitelist={["*"]}
          style={{ flex: 1, maxHeight: "50%", overflow: "hidden" }}
          source={{ html: `<h4>${data?.description?.en}</h4>` }}
        />
        <Text style={{ fontSize: 18 }}>{data?.hashing_algorithm}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator /> : renderCurrency(data!)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
