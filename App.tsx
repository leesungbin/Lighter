import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  View,
} from 'react-native';

import Ble from "./Ble";

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.main}>
        <Ble />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
    flexGrow: 1,
  },
  main: {
    flex: 1,
    color: 'white',
    justifyContent: "center",
    alignItems: "center"
  },
});

export default App;
