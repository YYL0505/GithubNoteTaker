import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';

import api from '../Utils/api';

class AddNote extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {state, dispatch} = this.props;
        var stateNote = state.default.note;
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

        api.addNote(stateNote.userInfo.login, stateNote.note)
            .then(() => {
                api.getNotes(stateNote.userInfo.login)
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

var styles = StyleSheet.create({
    
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
export default connect(selector)(AddNote);


