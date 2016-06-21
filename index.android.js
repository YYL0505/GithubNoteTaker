import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Navigator,
    TouchableHighlight,
    Image
} from 'react-native';
var Main = require('./App/Components/Main');
var Dashboard = require('./App/Components/Dashboard');
var Profile = require('./App/Components/Profile');
var Repository = require('./App/Components/Repository');
var Note = require('./App/Components/Note');
var Web_View= require('./App/Components/Helpers/WebViewer');

class GithubNoteTaker extends Component {
    render() {
        var NavigationBarRouteMapper = {
            LeftButton(route, navigator, index, navState) {
                if (index > 0) {
                    return (
                        <View style={styles.navigationContainer}>
                            <TouchableHighlight
                                onPress={() => navigator.pop()}>
                                <Image source={require('./asserts/ic_back.png')} style={styles.goBack}/>

                            </TouchableHighlight>
                            <Text style={styles.navText}>
                                {route.title}
                            </Text>
                        </View>

                    );
                } else {
                    return (
                        <View style={styles.navigationContainer}>
                            <Text style={styles.navText}>
                                {route.title}
                            </Text>
                        </View>
                    );
                }

            },
            RightButton(route, navigator, index, navState) {
                return null;
            },
            Title(route, navigator, index, navState) {
                return null;
            }
        };

        return (
            <Navigator
                initialRoute={{id: 'main', title: 'Main'}}
                renderScene={this.renderScene.bind(this)}
                navigationBar={
                    <Navigator.NavigationBar
                        style={styles.navigationContainer}
                        routeMapper={NavigationBarRouteMapper} />
                    }
            />
        );
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case 'main':
                return (
                    <Main navigator={navigator} title="Github NoteTaker"/>
                );
            case 'dashboard':
                return (
                    <Dashboard navigator={navigator} title={route.title} userInfo={route.passProps.userInfo}/>
                );
            case 'profile':
                return (
                    <Profile navigator={navigator} title={route.title} userInfo={route.passProps.userInfo}/>
                );
            case 'repository':
                return (
                    <Repository navigator={navigator} title={route.title} userInfo={route.passProps.userInfo} repos={route.passProps.repos}/>
                );
            case 'note':
                return (
                    <Note navigator={navigator} title={route.title} userInfo={route.passProps.userInfo} notes={route.passProps.notes}/>
                );
            case 'web_view':
                return (
                    <Web_View navigator={navigator} title={route.title} url={route.passProps.url}/>
                );
        }
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111',
    },

    navigationContainer: {
        backgroundColor: '#363636',
        alignItems: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingLeft: 10,
    },
    goBack: {
        marginTop: 13,
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    navText: {
        marginTop: 10,
        color: 'white',
        fontSize: 22
    }
});

AppRegistry.registerComponent('GithubNoteTaker', () => GithubNoteTaker);
