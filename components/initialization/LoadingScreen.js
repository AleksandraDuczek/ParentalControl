import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import * as firebase from 'firebase';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import userReducer from '../../reducers/index';

const reducer = combineReducers ({ userReducer });
const store = createStore(reducer);

export default class LoadingScreen extends React.Component {
		constructor(props) {
			super(props);
			this.navigate = this.navigate.bind(this);
		}

    componentDidMount() {
	    setTimeout(this.navigate, 3000)
    }

    navigate() {
	    firebase.auth().currentUser
		    ? this.props.navigation.navigate("App")
		    : this.props.navigation.navigate("Auth");
    }

    render() {
        return (
	        <Provider store={store}>
            <View style={styles.container}>
                <Image
                    source={require('../../src/img/Parental.png')}
                    style={{width: 250, height: 350, marginBottom: 40}}>
                </Image>
                <ActivityIndicator size="large"/>
            </View>
	        </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});