import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Platform
} from 'react-native';
import {connect} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

import NoteList from '../Components/NoteList';
import AddNote from './AddNote';

class Note extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const stateNote = this.props.state.default.note;
        return(
            <View style={styles.container}>
                <NoteList dataSource={stateNote.dataSource} userInfo={stateNote.userInfo}/>
                
                <AddNote />

                <View style={styles.spinnerContainer}>
                    <Spinner visible={this.props.state.default.loading.isLoading}/>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        marginTop: Platform.OS === 'ios' ? 0 : 50,
    },

    spinnerContainer: {
        transform: [{'translate':[0,0,1]}],
    },
});

function selector(state) {
    return {
        state: state
    }
}
export default connect(selector)(Note);


