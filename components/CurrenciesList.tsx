import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Image, View, Text, Button, ActivityIndicator } from 'react-native';

import Colors from '../constants/Colors';
import { useCoinsQuery } from '../hooks/useCoinsQuery';
import { RootTabScreenProps } from '../types';
import { API as CoinsAPI } from '../utils/initiate.api';
import { Currency } from './types';


export default function CurrenciesList({ path }: { path: string }) {

  const navigation = useNavigation();


  const {data, loading} = useCoinsQuery<Currency[]>('/markets', {
    per_page: 10,
    vs_currency: 'eur',
    order: 'market_cap_desc',
  })


  const renderItem = ({item}: {item: Currency}) => {

    return (
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 20}} onPress={ () => navigateToCoin(item.id)}>
        <Image source={{uri: item.image}} style={{width: 100, height: 100}} ></Image>
        <View style={{flexDirection: 'column', alignSelf: 'center', paddingLeft: 20}}>
          <Text>Name {item.name}</Text>
          <Text>symbol: {item.symbol}</Text>
          <Text>current price: {item.current_price}</Text>
          <Text>high in 24h {item.high_24h}</Text>
          <Text>low in 24h {item.low_24h}</Text>
        </View>
    </TouchableOpacity >
      )
  }

  const navigateToCoin = (coinId: string) => navigation.navigate("Root", {
    screen: 'Currency', params: {
      coinId
    }
  });

  const keyExtractor = (item: Currency) => item.id;

  return (
    <>
    {loading ? <ActivityIndicator/> : <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      style={{flex: 1}}
      />}
      </>
  );
}


const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
