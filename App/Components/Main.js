import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Platform
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';

import api from '../Utils/api';
import Dashboard from './Dashboard';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {state, dispatch} = this.props;
        var stateUser = state.default.user;

        var showErr = (
            stateUser.error ? <Text style={styles.error}> {stateUser.error} </Text> : <View></View>
        );

        var indicator = (
            stateUser.isLoading ?
                (Platform.OS === 'ios' ?
                        <ActivityIndicatorIOS
                            animating={stateUser.isLoading}
                            hidesWhenStopped={true}
                            color="#111111"
                            size="large"/>
                        :
                        <View style={styles.spinnerContainer}>
                            <Spinner visible={stateUser.isLoading}/>
                        </View>
                )
                : <View></View>

        );

        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Search for a Github User</Text>

                <TextInput
                    style={styles.searchInput}
                    value={stateUser.username}
                    onChange={this.handleChange.bind(this, dispatch)}/>

                <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this, stateUser, dispatch)} underlayColor="white">
                    <Text style={styles.searchText}> SEARCH </Text>
                </TouchableHighlight>

                {indicator}

                {showErr}
            </View>
        );
    }

    handleChange(dispatch, event) {
        dispatch({
            type: 'UPDATE_USERNAME',
            username: event.nativeEvent.text,
        });
    }

    handleSubmit(staterUser, dispatch) {
        dispatch({
            type: 'TOGGLE_LOADING',
        });

        api.getBio(staterUser.username)
            .then((response) => {
                if (response.message === 'Not Found') {
                    dispatch({
                        type: 'SET_ERROR',
                        error: 'User not found',
                    });
                } else {
                    dispatch({
                        type: 'FETCH_USER',
                        userInfo: response,
                    });

                    this.props.navigator.push({
                        title: response.name || 'Select An Option',
                        id: 'dashboard',
                        component: Dashboard,
                        passProps: {userInfo: response},
                    });
                }
            });
    }
}

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 30,
        marginTop: (Platform.OS === 'ios') ? 65 : 50,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#48BBEC',
    },

    spinnerContainer: {
        transform: [{'translate': [0, 0, 1]}],
    },

    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#ffffff',
    },

    searchInput: {
        height: 45,
        width: 300,
        borderColor: '#ffffff',
        borderRadius: 5,
        borderWidth: 1,
        alignSelf: 'center',
    },

    button: {
        height: 45,
        width: 300,
        marginTop: 10,
        backgroundColor: '#ffffff',
        borderColor: '#ffffff',
        borderRadius: 5,
        borderWidth: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },

    searchText: {
        textAlign: 'center',
        fontWeight: 'bold',
    },

    error: {
        color: '#110000',
    }

});

function selector(state) {
    return {
        state: state
    }
}
export default connect(selector)(Main);


