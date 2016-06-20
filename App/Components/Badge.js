import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';


class Badge extends Component {
    render() {
        console.log(this.props.userInfo);
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: this.props.userInfo.avatar_url}}/>
                <Text style={styles.name}>{this.props.userInfo.name}</Text>
                <Text style={styles.handle}>{this.props.userInfo.login}</Text>
            </View>
        );
    }
};


Badge.propTypes= {
    userInfo: React.PropTypes.object.isRequired
};

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#48BBEC',
        paddingBottom: 10,
    },

    name: {
        alignSelf: 'center',
        fontSize: 21,
        marginTop: 10,
        marginBottom: 5,
        color: '#FFFFFF'
    },

    handle: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#FFFFFF'
    },

    image: {
        height: 125,
        width: 125,
        borderRadius: 65,
        marginTop: 10,
        alignSelf: 'center'
    },

});

module.exports = Badge;


