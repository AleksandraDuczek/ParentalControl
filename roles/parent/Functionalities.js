import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Picker} from 'react-native';
import * as firebase from "firebase";

export default class Functionalities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
        this.signOut = this.signOut.bind(this);
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

    signOut() {
        this.props.navigation.navigate("Auth", { logOut: true });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Czesc, jestes rodzicem.</Text>
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
        marginTop: 300,
        marginLeft: 100,
        backgroundColor: "#E8AEBE",
        borderRadius: 5,
        height: 80,
        width: 120,
        alignItems: "center",
        textAlign: "center"
    },
});