import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';
import App from './App/containers/App';

class GithubNoteTaker extends Component {
  render() {
    return (
        <App />
    );
  }
}

AppRegistry.registerComponent('GithubNoteTaker', () => GithubNoteTaker);