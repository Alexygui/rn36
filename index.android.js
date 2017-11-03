/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry, ListView, Navigator,
    StyleSheet,
    Text, TextInput, TouchableHighlight,
    Dimensions,
    View, Image
} from 'react-native';
import MyScene from "./android/test/MyScene";
import styles from './android/test/styles';
import Son from './android/test/Son';
import Mock from './node_modules/mockjs/src/mock';


export default class rn36 extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const width = Dimensions.get('window').width;
        this.state = {
            dataSource: ds,
            dataList: [],
            width: width
        };
    }

    componentDidMount() {
        let _this = this;
        fetch('http://rapapi.org/mockjs/19395/api/creation?page=1&accessToken=1')
            .then((response) => response.json())
            .then((responseJson) => {
                const data = Mock.mock(responseJson);
                console.log(JSON.stringify(data, null, 2));
                if (data.data.length > 0) {
                    let dataList = this.state.dataList.concat(data.data);
                    _this.setState({
                        dataSource: _this.state.dataSource.cloneWithRows(dataList),
                        dataList: dataList
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    censor(censor) {
        let i = 0;
        return function (key, value) {
            if (i !== 0 && typeof(censor) === 'object' && typeof(value) === 'object' && censor === value) return '[Circular]';
            if (i >= 30) // seems to be a harded maximum of 30 serialized objects?
                return '[Unknown]';
            ++i; // so we know we aren't using the original object anymore
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
    // render() {
    //     return (
    //         <Navigator
    //             initialRoute={{
    //                 component: MyScene,
    //                 title: 'My Initial Scene',
    //                 index: 0
    //             }}
    //             renderScene={(route, navigator) => {
    //                 let Component = route.component;
    //                 return <Component {...route} navigator={navigator}/>
    //             }}
    //         />
    //     );
    // }

    //列表
    // render() {
    //     return (
    //         <View style={{flex: 1, paddingTop: 22, alignItems: 'center'}}>
    //             <ListView
    //                 dataSource={this.state.dataSource}
    //                 renderRow={(rowData) => <Text style={{
    //                     fontSize: 20,
    //                     padding: 10,
    //                     textAlign: 'center',
    //                     width: Dimensions.get('window').width
    //                 }}>{rowData}</Text>}
    //             />
    //         </View>
    //     );
    // }

    //列表2
    render() {
        return (
            <View style={{flex: 1, paddingTop: 22, alignItems: 'center'}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <View>
                        <Text style={{
                            fontSize: 20,
                            padding: 10,
                            textAlign: 'left',
                            width: this.state.width
                        }}>{rowData.title}
                        </Text>
                        <Image
                            style={{width: this.state.width, height: 200}}
                            source={{uri: rowData.thumb}}
                        />
                    </View>}
                />
            </View>
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

