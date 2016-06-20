/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
var Main = require('./App/Components/Main');

class GithubNoteTaker extends Component {
  render() {
    return (
      <NavigatorIOS
          style={styles.container}
          initialRoute={{
            component: Main,
            title: 'Github NoteTaker',
          }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },
});

AppRegistry.registerComponent('GithubNoteTaker', () => GithubNoteTaker);
