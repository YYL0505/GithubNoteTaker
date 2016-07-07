import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Navigator,
} from 'react-native';


import Main from '../containers/Main';

class IOSBaseApp extends Component {
    render() {
        return (
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    component: Main,
                    title: 'Github NoteTaker',
                }}
            />
        );}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111',
    },
});
export default IOSBaseApp;