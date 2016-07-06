import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
var Main = require('./App/Components/Main');
var Dashboard = require('./App/Components/Dashboard');

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
