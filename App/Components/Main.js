import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS,
} from 'react-native';

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

        console.log("submit");
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
    }

});

module.exports = Main;


