import React from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import * as firebase from 'firebase';

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
            <View style={styles.container}>
                <Image
                    source={require('./Parental.jpg')}
                    style={{width: 250, height: 350, marginBottom: 40}}>
                </Image>
                <ActivityIndicator size="large"/>
            </View>
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