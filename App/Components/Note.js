import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    ListView,
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import api from '../Utils/api';
import Badge from './Badge';
import Separator from './Helpers/Separator';

class Note extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {state, dispatch} = this.props;
        var stateNote = state.default.note;
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={stateNote.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections = {true}
                    renderHeader={this.renderHeader.bind(this)}/>

                {this.footer(stateNote, dispatch)}

                <View style={styles.spinnerContainer}>
                    <Spinner visible={stateNote.isLoading}/>
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

    footer(stateNote, dispatch) {
        return (
            <View style={styles.footContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={stateNote.note}
                    onChange={this.handleNoteChange.bind(this, dispatch)}
                    placeHolder="New Note"/>

                <TouchableHighlight
                    style={styles.button}
                    onPress={this.submitNote.bind(this, stateNote, dispatch)}
                    underlayColor="#88D4F5">
                    <Text style={styles.buttonText}> Submit </Text>
                </TouchableHighlight>
            </View>
        );
    }

    handleNoteChange(dispatch, event) {
        dispatch({
            type: 'SET_NOTE',
            note: event.nativeEvent.text,
        });
    }

    submitNote(stateNote, dispatch) {
        dispatch({
            type: 'TOGGLE_LOADING',
        });

        api.addNote(this.props.userInfo.login, stateNote.note)
            .then(() => {
                api.getNotes(this.props.userInfo.login)
                    .then((response) => {
                        dispatch({
                            type: 'FETCH_NOTES',
                            notes: response,
                        });
                    })
                    .catch((error) => {
                        dispatch({
                            type: 'TOGGLE_LOADING',
                        });

                        console.log('Request failed' + error);
                    });
            })
    }

}


Note.propTypes= {
    userInfo: React.PropTypes.object.isRequired,
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: Platform.OS === 'ios' ? 0 : 50,
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

function selector(state) {
    return {
        state: state
    }
}
export default connect(selector)(Note);


