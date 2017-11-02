import React, {Component, PropTypes} from "react";
import {Text, TouchableHighlight, View, StyleSheet} from "react-native";
import styles from './styles'

class Son extends Component {
    constructor(props) {
        super(props);
        console.log('son: constructor. super props:' + JSON.stringify(props) + ' | this.props===props: ' + (this.props === props).toString());
        this.state = {
            times: this.props.times
        };
    }

    componentWillMount() {
        console.log('son: componentWillMount');
    }

    componentDidMount() {
        console.log('son: componentDidMount');
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.setState({times: nextProps.times});
        console.log('son: componentWillReceiveProps' + ' | nextProps:' + JSON.stringify(nextProps) + ' | this.props:' + JSON.stringify(this.props) + ' | nextState:' + JSON.stringify(nextState) + ' | this.state:' + JSON.stringify(this.state));
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('son: shouldComponentUpdate' + ' | nextProps:' + JSON.stringify(nextProps) + ' | this.props:' + JSON.stringify(this.props) + ' | nextState:' + JSON.stringify(nextState) + ' | this.state:' + JSON.stringify(this.state));
        return nextState !== this.state;
    }

    componentWillUpdate(nextProps, nextState) {
        // 此处不能添加setState的方法，会进入死循环
        // 估计是因为更新了state以后会再次调用componentWillUpdate方法，所以导致无限循环
        // this.setState({times: props.times});
        console.log('son: componentWillUpdate ' + ' | nextProps: ' + JSON.stringify(nextProps) + ' | this.props: ' + JSON.stringify(this.props) + ' | nextState:' + JSON.stringify(nextState) + ' | this.state:' + JSON.stringify(this.state));
    }

    componentDidUpdate(preProps, preState) {
        console.log('son: componentDidUpdate' + ' | preProps: ' + JSON.stringify(preProps) + ' | this.props: ' + JSON.stringify(this.props) + ' | preState:' + JSON.stringify(preState) + ' | this.state:' + JSON.stringify(this.state));
    }

    componentWillUnmount() {
        console.log('son: componentWillUnmount');
    }

    addMe() {
        let t = this.state.times;
        t++;
        this.setState({times: t});
    }

    resetT() {
        this.props.resetTimes();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 40}}>Son:</Text>
                <TouchableHighlight onPress={this.addMe.bind(this)}>
                    <Text style={styles.welcome}>click to add me only.</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.resetT.bind(this)}>
                    <Text style={styles.welcome}>click me to reset times for father and me.</Text>
                </TouchableHighlight>
                <Text style={styles.welcome}>you click me {this.state.times} times.</Text>
                {console.log('son: render')}
            </View>
        );
    }
}