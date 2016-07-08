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
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../action';
import Profile from '../Components/Profile';
import Repository from '../Components/Repository';
import Note from './Note';
import api from '../Utils/api';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {state, dispatch} = this.props;
        var stateUser = state.default.user;
        const action = bindActionCreators(actions, dispatch);

        return (
            <View style={styles.container}>
                <Image style={styles.userAvatar} source={{uri: stateUser.userInfo.avatar_url}}/>
                <TouchableHighlight style={styles.profile} onPress={this.goToProfile.bind(this, stateUser)}>
                    <Text style={styles.viewText}>View Profile</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.repository} onPress={this.goToRepos.bind(this, stateUser, dispatch, action)}>
                    <Text style={styles.viewText}>View Repos</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.notes} onPress={this.goToNotes.bind(this, stateUser, dispatch, action)}>
                    <Text style={styles.viewText}>View Notes</Text>
                </TouchableHighlight>

                <View style={styles.spinnerContainer}>
                    <Spinner visible={this.props.state.default.loading.isLoading}/>
                </View>
            </View>
        );
    }

    goToProfile(stateUser) {
        this.props.navigator.push({
            id: 'profile',
            title: 'Profile',
            component: Profile,
            passProps: {userInfo: stateUser.userInfo},
        });
    }

    goToRepos(stateUser, dispatch, action) {
        dispatch(action.toggleLoadingOn());

        api.getRepos(stateUser.userInfo.login)
            .then((response) => {
                this.props.navigator.push({
                    id: 'repository',
                    title: 'Repository',
                    component: Repository,
                    passProps: {
                        userInfo: stateUser.userInfo,
                        repos: response,
                    },
                });

                dispatch(action.toggleLoadingOff());
            });
    }

    goToNotes(stateUser, dispatch, action) {
        dispatch(action.toggleLoadingOn());

        api.getNotes(stateUser.userInfo.login)
            .then((response) => {
                response = response || {};

                dispatch(action.fetchNotes(response, stateUser.userInfo));

                this.props.navigator.push({
                    id: 'note',
                    title: 'Notes',
                    component: Note,
                });

                dispatch(action.toggleLoadingOff());
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

function selector(state) {
    return {
        state: state
    }
}
export default connect(selector)(Dashboard);


