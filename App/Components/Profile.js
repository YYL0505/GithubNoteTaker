import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';


class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>This is Profile</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 65,
    },

});

module.exports = Profile;


