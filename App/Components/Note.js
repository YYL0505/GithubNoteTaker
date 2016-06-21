import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ListView
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

var api = require('../Utils/api');
var Badge = require('./Badge');
var Separator = require('./Helpers/Separator');

class Note extends Component {
    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: this.dataSource.cloneWithRows(this.props.notes),
            note: '',
            error: '',
            isLoading: false,
        };
    }

    render() {
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections = {true}
                    renderHeader={this.renderHeader.bind(this)}/>

                {this.footer()}

                <View style={styles.spinnerContainer}>
                    <Spinner visible={this.state.isLoading}/>
                </View>
            </View>
        );
    }

    renderRow(rowData) {
        return (
            <View>
                <View style={styles.rowContainer}>
                    <Text> {rowData}</Text>
                </View>
                <Separator />
            </View>
        );
    }

    renderHeader() {
        return (
            <Badge userInfo={this.props.userInfo}/>
        );
    }

    footer() {
        return (
            <View style={styles.footContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.note}
                    onChange={this.handleNoteChange.bind(this)}
                    placeHolder="New Note"/>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.submitNote.bind(this)}
                    underlayColor="#88D4F5">
                    <Text style={styles.buttonText}> Submit </Text>
                </TouchableHighlight>
            </View>
        );
    }

    handleNoteChange(event) {
        this.setState({
            note: event.nativeEvent.text,
        });
    }

    submitNote() {
        this.setState({
            isLoading: true,
        });

        api.addNote(this.props.userInfo.login, this.state.note)
            .then(() => {
                api.getNotes(this.props.userInfo.login)
                    .then((response) => {
                        this.setState({
                            isLoading: false,
                        });

                        this.setState({
                            dataSource: this.dataSource.cloneWithRows(response),
                            note: '',
                        });
                    })
                    .catch((error) => {
                        this.setState({
                            isLoading: false,
                        });

                        console.log('Request failed' + error);
                        this.setState({
                            error: error,
                        });
                    });
            })
    }

}


Note.propTypes= {
    userInfo: React.PropTypes.object.isRequired,
    notes: React.PropTypes.object.isRequired,
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },

    spinnerContainer: {
        transform: [{'translate':[0,0,1]}],
    },

    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
    },

    button: {
        height: 60,
        backgroundColor: '#48BBEC',
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },

    searchInput: {
        height: 60,
        padding: 10,
        fontSize: 18,
        color: '#111111',
        flex: 10,
    },

    rowContainer: {
        padding: 10,
    },

    footContainer: {
        backgroundColor: '#E3E3E3',
        alignItems: 'center',
        flexDirection: 'row',
    },
});

module.exports = Note;


