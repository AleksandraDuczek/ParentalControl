import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as firebase from 'firebase';

export default class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = 	{
            email: "",
            role: "",
            familyId: 0,
        };
        this.signOut = this.signOut.bind(this);
        this.checkId = this.checkId.bind(this);
    }

    componentDidMount() {
        const params = this.props.navigation.state.params;
        if (params) {
            this.setState({
                email: params.email,
                role: params.role,
            });
        }
        const { email } = firebase.auth().currentUser;
        this.setState({ email });
    };

    checkId() {
        console.log(this.state.familyId);
        // check id in data base
    }

    signOut() {
        this.props.navigation.navigate("Auth", { logOut: true });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Rola: {this.state.role}</Text>
                <Text>Email: {this.state.email}</Text>
                <Text> Wpisz ID rodzica: </Text>
                <TextInput style={styles.input}
                           autoCapitalize="none"
                           onChangeText={familyId => this.setState({familyId})}
                           value={this.state.familyId}>
                </TextInput>
                <TouchableOpacity style={styles.button}
                                  onPress={this.checkId}>
                    <Text style={styles.inputTitle}>
                        Przypisz id
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                  onPress={this.signOut}>
                    <Text style={styles.inputTitle}>
                        Wyloguj
                    </Text>
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
    inputTitle: {
        marginTop: 10,
        color: "grey",
        fontSize: 10,
        fontWeight: "600",
        textTransform: "uppercase",
    },
});