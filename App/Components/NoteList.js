import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    Platform
} from 'react-native';

import Badge from '../Components/Badge';
import Separator from '../Components/Helpers/Separator';

class NoteList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ListView
                dataSource={this.props.dataSource}
                renderRow={this.renderRow}
                enableEmptySections={true}
                renderHeader={this.renderHeader.bind(this, this.props.userInfo)}/>
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
    rowContainer: {
        padding: 10,
    },
});

NoteList.propTypes = {
    dataSource: React.PropTypes.object.isRequired,
    userInfo: React.PropTypes.object.isRequired,
};
export default NoteList;


