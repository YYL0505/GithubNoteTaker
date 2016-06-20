import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';

var Profile = require('./Profile');

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.userInfo);
        return (
            <View style={styles.container}>
                <Image style={styles.userAvatar} source={{uri: this.props.userInfo.avatar_url}}/>
                <TouchableHighlight style={styles.profile} onPress={this.goToProfile.bind(this)}>
                    <Text style={styles.viewText}>View Profile</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.repository} onPress={this.goToRepos.bind(this)}>
                    <Text style={styles.viewText}>View Repos</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.notes} onPress={this.goToNotes.bind(this)}>
                    <Text style={styles.viewText}>View Notes</Text>
                </TouchableHighlight>
            </View>
        );
    }

    goToProfile() {
        this.props.navigator.push({
            title: this.props.userInfo.name,
            component: Profile,
            passProps: {userInfo: this.props.userInfo},
        });
    }

    goToRepos() {
        console.log('go to repository');

    }

    goToNotes() {
        console.log('go to notes');

    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 65,
    },

    userAvatar: {
        flex: 0.7,
        width: 400,
        resizeMode: 'cover',

    },

    profile: {
        backgroundColor: '#72B8EA',
        flex: 0.1,
        justifyContent: 'center',
    },

    repository: {
        backgroundColor: '#C358A3',
        flex: 0.1,
        justifyContent: 'center',
    },

    notes: {
        backgroundColor: '#6D72F0',
        flex: 0.1,
        justifyContent: 'center',
    },

    viewText: {
        textAlign: 'center',
    }

});

module.exports = Dashboard;


