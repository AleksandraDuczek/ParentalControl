import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import * as firebase from 'firebase';

export default class LoadingScreen extends React.Component {
    componentDidMount() {
        this.timer = setInterval(
            () => firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    user.getIdTokenResult().then(idTokenResult => {
                        console.log(idTokenResult.claims.parent);
                        console.log(idTokenResult.claims.child);
                    })
                }

                this.props.navigation.navigate( user ? "App" : "Auth")
            }),
            0,
        );
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