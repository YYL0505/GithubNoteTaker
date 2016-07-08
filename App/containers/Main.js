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
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from '../action';
import api from '../Utils/api';
import Dashboard from './Dashboard';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {state, dispatch} = this.props;
        var stateUser = state.default.user;
        const action = bindActionCreators(actions, dispatch);

        var showErr = (
            stateUser.error ? <Text style={styles.error}> {stateUser.error} </Text> : <View></View>
        );

        var indicator = (
            this.props.state.default.loading.isLoading ?
                (Platform.OS === 'ios' ?
                        <ActivityIndicatorIOS
                            animating={stateUser.isLoading}
                            hidesWhenStopped={true}
                            color="#111111"
                            size="large"/>
                        :
                        <View style={styles.spinnerContainer}>
                            <Spinner visible={this.props.state.default.loading.isLoading}/>
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
                    onChange={this.handleChange.bind(this, dispatch, action)}/>

                <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this, stateUser, dispatch, action)} underlayColor="white">
                    <Text style={styles.searchText}> SEARCH </Text>
                </TouchableHighlight>

                {indicator}

                {showErr}
            </View>
        );
    }

    handleChange(dispatch, action, event) {
        dispatch(action.setUser(event.nativeEvent.text));
    }

    handleSubmit(staterUser, dispatch, action) {
        dispatch(action.toggleLoadingOn());


        api.getBio(staterUser.username)
            .then((response) => {
                if (response.message === 'Not Found') {
                    dispatch(action.toggleLoadingOff());

                    dispatch(action.setError('User not found'));

                } else {
                    dispatch(action.fetchUser(response));

                    this.props.navigator.push({
                        title: response.name || 'Select An Option',
                        id: 'dashboard',
                        component: Dashboard,
                        passProps: {userInfo: response},
                    });

                    dispatch(action.toggleLoadingOff());
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


