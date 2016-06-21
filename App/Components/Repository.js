import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight,
    Platform
} from 'react-native';
var Badge = require('./Badge');
var Separator = require('./Helpers/Separator');
var Web_View= require('./Helpers/WebViewer');

class Repository extends Component {
    render() {
        var repos = this.props.repos;
        var list = repos.map((item, index) => {
            var desc = repos[index].description ? <Text style={styles.description}> {repos[index].description} </Text> : <View />

            return(
                <View key={index}>
                    <View style={styles.rowContainer}>
                        <TouchableHighlight
                        onPress={this.openPage.bind(this, repos[index].html_url)}
                        underlayColor="transparent">
                            <Text style={styles.name}>{repos[index].name}</Text>
                        </TouchableHighlight>

                        <Text style={styles.star}> Stars: {repos[index].stargazers_count} </Text>

                        {desc}
                    </View>

                    <Separator />
                </View>
            );
        });

        return (
           <ScrollView style={styles.container}>
               <Badge userInfo={this.props.userInfo} />

               {list}
           </ScrollView>
        );
    }

    openPage(url) {
        this.props.navigator.push({
            title: 'Web View',
            component: Web_View,
            passProps: {url: url},
        });
    }
};

Repository.propTypes= {
    userInfo: React.PropTypes.object.isRequired,
    repos: React.PropTypes.array.isRequired,
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : 50,
    },

    rowContainer: {
        padding: 10,
        flex: 1,
        flexDirection: 'column',
    },

    name: {
        color: '#48BBEC',
        fontSize: 18,
        paddingBottom: 5,
    },

    star: {
        color: '#48BBEC',
        fontSize: 14,
        paddingBottom: 5,
    },

    description: {
        fontSize: 14,
        paddingBottom: 5,
    },

});

module.exports = Repository;


