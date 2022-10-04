import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/shared/SearchBar';
import { Fonts } from '../constants/fonts';
import Colors from '../constants/colors';

const FavoriteScreen = () => {
  const [search, setSearch] = useState('');
  return (
    <SafeAreaView edges={['left', 'right', 'top']} style={styles.screen}>
      <View>
        <Text style={styles.header}>Favorites</Text>
      </View>
      <View style={styles.search}>
        <SearchBar value={search} onChange={setSearch} />
      </View>
    </SafeAreaView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 10,
  },
  header: {
    fontFamily: Fonts.Karla.ExtraBold,
    fontSize: 24,
    lineHeight: 30,
    color: Colors.text,
  },
  search: {
    marginTop: 15,
  },
});
