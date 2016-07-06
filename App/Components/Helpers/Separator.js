import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

class Separator extends Component {
    render() {
        return (
            <View style={styles.separator}/>
        );
    }
};

var styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#E4E4E4',
        flex: 1,
        marginLeft: 10,
    }
});

export default Separator;
