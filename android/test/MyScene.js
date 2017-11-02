import React, {Component, PropTypes} from "react";
import {Text, TouchableHighlight, View, StyleSheet} from "react-native";
import styles from './styles'

export default class MyScene extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired
        // onForWard: PropTypes.func.isRequired,
        // onBack: PropTypes.func.isRequired,
    };

    censor(censor) {
        let i = 0;

        return function (key, value) {
            if (i !== 0 && typeof(censor) === 'object' && typeof(value) === 'object' && censor === value) return '[Circular]';
            // if(typeof value === 'function') return '[Function]';
            if (i >= 30) // seems to be a harded maximum of 30 serialized objects?
                return '[Unknown]';

            ++i; // so we know we aren't using the original object anymore
            // console.log('i: ' + i);
            return value;
        }
    }

    onForWard() {
        let thisIndex = this.props.index;
        thisIndex++;
        this.props.navigator.push({
            title: 'Scene' + thisIndex,
            component: MyScene,
            index: thisIndex
        });
        console.log('constructor: ' + JSON.stringify(this.props, ['title', 'index'], 2));
    }

    onBack() {
        if (this.props.index > 0) {
            this.props.navigator.pop();
            console.log('constructor: ' + JSON.stringify(this.props, ['title', 'index'], 2));
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Current Scene: {this.props.title}</Text>
                <TouchableHighlight onPress={this.onForWard.bind(this)}>
                    <Text style={styles.welcome}>点我进入下一场景</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.onBack.bind(this)}>
                    <Text style={styles.welcome}>点我返回上一场景</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

