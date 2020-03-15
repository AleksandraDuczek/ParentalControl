import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Picker} from 'react-native';
import * as firebase from "firebase";

export default class Func extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        }
    }

    componentDidMount() {
        if (this.props.navigation.state.params) {
            this.setState({
                email: this.props.navigation.state.params.email,
            });
            return;
        }
        const { email } = firebase.auth().currentUser;
        this.setState({ email });
    };

    signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log("Signed out")
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Czesc, jestes dzieckiem.</Text>
                <Text>{this.state.email}</Text>
                <TouchableOpacity style={styles.button}
                                  onPress={this.signOut}>
                    <Text style={styles.inputTitle}>Wyloguj</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        marginTop: 480,
        marginLeft: 200,
        backgroundColor: "#E8AEBE",
        borderRadius: 5,
        height: 40,
        width: 90,
        alignItems: "center",
        textAlign: "center"
    },
});