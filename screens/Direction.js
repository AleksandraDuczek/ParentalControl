import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';

export default class Direction extends React.Component {
    state = {
        name: "",
        email: "",
        role: "",
        displayName: "",
        surname: "",
        errorMessage: "",
        uid: 0,
    };


    goToParentComonent() {
        this.props.navigation.navigate("Parent", { email: this.state.email });
        return;
    }
    goToChildComonent() {
        this.props.navigation.navigate("Child", { email: this.state.email });
        return;
    }

    goToChooseRole() {
        debugger;
        this.props.navigation.navigate("ChooseRole", { email: this.state.email });
        return;
    }

    componentDidMount() {
        const { email } = firebase.auth().currentUser;
        this.setState({ email });

        debugger;
        firebase.auth().currentUser.getIdTokenResult()
            .then((idTokenResult) => {
                debugger;
                if (idTokenResult.claims.parent || idTokenResult.claims.child) {
                    idTokenResult.claims.parent
                        ? this.goToParentComonent()
                        : this.goToChildComonent();
                    return;
                }
                else {
                    this.signOut();
                    return;
                }
            })
            .catch(err => err)
    }

    signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log("Signed out")
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Jestesmy tu na chwiiile</Text>
                <TouchableOpacity style={styles.button}
                                  onPress={this.signOut}>
                    <Text style={styles.inputTitle}>Wyloguj</Text>
                </TouchableOpacity>
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