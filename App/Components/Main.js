import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS,
} from 'react-native';

var api = require('../Utils/api');
var Dashboard = require('./Dashboard');

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isLoading: false,
            error: false
        }
    }

    render() {
        var showErr = (
            this.state.error ? <Text style={styles.error}> {this.state.error} </Text> : <View></View>
        );

        var indicator = (
            this.state.isLoading ?
                <ActivityIndicatorIOS
                animating={this.state.isLoading}
                hidesWhenStopped={true}
                color="#111111"
                size="large"/>
                :
                <View></View>
        );

        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Search for a Github User</Text>

                <TextInput
                    style={styles.searchInput}
                    value={this.state.username}
                    onChange={this.handleChange.bind(this)}/>

                <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)} underlayColor="white">
                    <Text style={styles.searchText}> SEARCH </Text>
                </TouchableHighlight>

                {indicator}

                {showErr}
            </View>
        );
    }

    handleChange(event) {
        this.setState({
            username: event.nativeEvent.text,
        });
    }

    handleSubmit() {
        this.setState({
            isLoading: true,
        });

        api.getBio(this.state.username)
            .then((response) => {
                if (response.message === 'Not Found') {
                    this.setState({
                        error: 'User not found',
                        isLoading: false,
                    });
                } else {
                    this.props.navigator.push({
                        title: response.name || 'Select An Option',
                        component: Dashboard,
                        passProps: {userInfo: response},
                    });

                    this.setState({
                        error: false,
                        isLoading: false,
                        username: "",
                    });
                }
            });
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

module.exports = Main;


