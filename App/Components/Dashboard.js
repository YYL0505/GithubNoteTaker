import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';


class Dashboard extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>This is the dashboard</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        backgroundColor: '#000000',
    },
});

module.exports = Dashboard;


