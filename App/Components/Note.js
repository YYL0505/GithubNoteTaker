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

import AddNote from '../containers/AddNote';
import Badge from './Badge';
import Separator from './Helpers/Separator';

class Note extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const stateNote = this.props.state.default.note;
        return(
            <View style={styles.container}>
                <ListView
                    dataSource={stateNote.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections = {true}
                    renderHeader={this.renderHeader.bind(this, stateNote.userInfo)}/>

                <AddNote />

                <View style={styles.spinnerContainer}>
                    <Spinner visible={this.props.state.default.loading.isLoading}/>
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

    renderHeader(userInfo) {
        return (
            <Badge userInfo={userInfo}/>
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

    rowContainer: {
        padding: 10,
    },
});

function selector(state) {
    return {
        state: state
    }
}
export default connect(selector)(Note);


