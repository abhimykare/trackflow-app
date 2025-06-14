import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import RouteNavigator from './src/routes/routeNavigator';
import QueryProvider from './src/providers/QueryProvider';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <QueryProvider>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RouteNavigator />
      </View>
    </QueryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
