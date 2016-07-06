import React, {Component} from 'react';
import {
    StyleSheet,
    WebView,
    View,
    Platform
} from 'react-native';

class WebViewer extends Component {
    render() {
        return (
            <View style={styles.container}>
                <WebView source={{uri: this.props.url}}/>
            </View>
        );
    }
};

WebViewer.propTypes= {
    url: React.PropTypes.object.isRequired,
};

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#F6F6Ef',
        flex: 1,
        flexDirection: 'column',
        marginTop: (Platform.OS === 'ios') ? 65 : 50,
    }
});

export default WebViewer;
