import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';
var Badge = require('./Badge');

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var userInfo = this.props.userInfo;
        var topicArr = ['company', 'location', 'follower', 'following', 'email', 'bio', 'public_repos'];
        var list = topicArr.map((item, index) => {
            if(!userInfo[item]) {
                return <View key={index}/>
            } else {
                return(
                    <View key={index} style={styles.rowContainer}>
                        <Text style={styles.rowTitle}>{this.getRowTitle(userInfo, item)}</Text>
                        <Text style={styles.rowContent}>{userInfo[item]}</Text>
                    </View>
                );
            }
        });

        return (
           <ScrollView style={styles.container}>
               <Badge userInfo={this.props.userInfo} />
               {list}
           </ScrollView>
        );
    }


    getRowTitle(userInfo, item) {
        item = (item === 'public_repos') ? item.replace('_', '') : item;
        return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
        alignSelf: 'center',
    },

    rowContainer: {
        padding: 10,
    },

    rowTitle: {
        color: '#48BBEC',
        fontSize: 16,
    },

    rowContent: {
        fontSize: 19,
    },
});

module.exports = Profile;


