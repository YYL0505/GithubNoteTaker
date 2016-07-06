import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Platform
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Profile from './Profile';
import Repository from './Repository';
import Note from './Note';
import api from '../Utils/api';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    render() {
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

                <View style={styles.spinnerContainer}>
                    <Spinner visible={this.state.isLoading}/>
                </View>
            </View>
        );
    }

    goToProfile() {
        this.props.navigator.push({
            id: 'profile',
            title: 'Profile',
            component: Profile,
            passProps: {userInfo: this.props.userInfo},
        });
    }

    goToRepos() {
        this.setState({
            isLoading: true,
        });

        api.getRepos(this.props.userInfo.login)
            .then((response) => {
                this.props.navigator.push({
                    id: 'repository',
                    title: 'Repository',
                    component: Repository,
                    passProps: {
                        userInfo: this.props.userInfo,
                        repos: response,
                    },
                });

                this.setState({
                    isLoading: false,
                });
            });
    }

    goToNotes() {
        this.setState({
            isLoading: true,
        });

        api.getNotes(this.props.userInfo.login)
            .then((response) => {
                response = response || {};
                this.props.dispatch({
                    type: 'FETCH_NOTES',
                    notes: response
                });
                this.props.navigator.push({
                    id: 'note',
                    title: 'Notes',
                    component: Note,
                    passProps: {
                        userInfo: this.props.userInfo,
                        notes: response,
                    },
                });

                this.setState({
                    isLoading: false,
                });
            });

    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 65 : 50,
    },

    spinnerContainer: {
        transform: [{'translate':[0,0,1]}],
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

export default Dashboard;


