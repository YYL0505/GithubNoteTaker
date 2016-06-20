
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

class Main extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>
                    test router
                </Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: 65,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#48BBEC',
    },

    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#ffffff',
    },

});

module.exports = Main;


