/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry, Navigator,
    StyleSheet,
    Text, TextInput, TouchableHighlight,

    View
} from 'react-native';
import MyScene from "./android/test/MyScene";
import styles from './android/test/styles';
import Son from './android/test/Son';

export default class rn36 extends Component {
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

    // render() {
    //     return (
    //         <Navigator
    //             initialRoute={{title: 'My Initial Scene', index: 0}}
    //             renderScene={(route, navigator) =>
    //                 <MyScene
    //                     title={route.title}
    //                     onForWard={() => {
    //                         const nextIndex = route.index + 1;
    //                         navigator.push({
    //                             title: 'Scene' + nextIndex,
    //                             index: nextIndex
    //                         });
    //                         console.log('route: ' + JSON.stringify(route));
    //                         // console.log('route: ' + JSON.stringify(route) + ' | navigator: ' + JSON.stringify(navigator, this.censor(navigator), 2));
    //                     }}
    //                     onBack={() => {
    //                         if (route.index > 0) {
    //                             navigator.pop();
    //                         }
    //                     }}
    //                 />
    //             }
    //         />
    //     );
    // }
    render() {
        return (
            <Navigator
                initialRoute={{
                    component: MyScene,
                    title: 'My Initial Scene',
                    index: 0
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route} navigator={navigator}/>
                }}
            />
        );
    }
}


// export default class rn36 extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             showSon: false,
//             times: 0
//         };
//         console.log('father: constructor');
//     }
//
//     componentWillMount() {
//         console.log('father: componentWillMount');
//     }
//
//     componentDidMount() {
//         console.log('father: componentDidMount');
//         console.log('------------------------------');
//     }
//
//     componentWillReceiveProps(nextProps) {
//         console.log('father: componentWillReceiveProps');
//     }
//
//     shouldComponentUpdate(nextProps, nextState) {
//         console.log('father: shouldComponentUpdate' + ' | nextProps:' + JSON.stringify(nextProps) + ' | this.props:' + JSON.stringify(this.props) + ' | nextState:' + JSON.stringify(nextState) + ' | this.state:' + JSON.stringify(this.state));
//         return nextState !== this.state;
//     }
//
//     componentWillUpdate(nextProps, nextState) {
//         console.log('father: componentWillUpdate');
//     }
//
//     componentDidUpdate(preProps, preState) {
//         console.log('father: componentDidUpdate');
//         console.log('------------------------------');
//     }
//
//     componentWillUnmount() {
//         console.log('father: componentWillUnmount');
//     }
//
//     updateTimes() {
//         let t = this.state.times;
//         t++;
//         this.setState({times: t});
//     }
//
//     ifShowSon() {
//         this.setState({showSon: !this.state.showSon});
//     }
//
//     resetTimes() {
//         this.setState({times: 0})
//     }
//
//     render() {
//         return (
//             <View style={styles.container}>
//                 {this.state.showSon
//                     ? <Son times={this.state.times} resetTimes={this.resetTimes.bind(this)}/>
//                     : null}
//                 <Text style={{fontSize: 40}}>Father:</Text>
//                 <TouchableHighlight onPress={this.ifShowSon.bind(this)}>
//                     <Text style={styles.welcome}>
//                         click me to {this.state.showSon ? 'hide' : 'show'} Son component.
//                     </Text>
//                 </TouchableHighlight>
//                 <TouchableHighlight onPress={this.updateTimes.bind(this)}>
//                     <Text style={styles.welcome}>click me to add my times and Son's times.</Text>
//                 </TouchableHighlight>
//                 <TouchableHighlight onPress={this.resetTimes.bind(this)}>
//                     <Text style={styles.welcome}>press me to reset times for me and Son.</Text>
//                 </TouchableHighlight>
//                 <Text style={styles.welcome}>you click me {this.state.times} times.
//                 </Text>
//                 {console.log('father: render')}
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 6,
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
// });

AppRegistry.registerComponent('rn36', () => rn36);

