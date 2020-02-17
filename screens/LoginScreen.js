import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
    state = {
        email: "",
        password: "",
        errorMessage: null,
    };

    handleLogin = () => {
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(errorMessage => this.setState({errorMessage}))
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}>
                    Zaloguj się
                </Text>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>
                            Adres email
                        </Text>
                        <TextInput style={styles.input}
                                   autoCapitalize="none"
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}>
                        </TextInput>
                    </View>

                    <View>
                        <Text style={styles.inputTitle}>
                            Hasło
                        </Text>
                        <TextInput style={styles.input}
                                   secureTextEntry
                                   autoCapitalize="none"
                                   onChangeText={password => this.setState({password})}
                                   value={this.state.password}>
                        </TextInput>
                    </View>

                    <Text style={styles.error}>
                        {
                            this.state.errorMessage
                            && <Text style={styles.error}>Błędny login lub hasło</Text>
                        }
                    </Text>

                    <TouchableOpacity style={styles.button}
                                      onPress={this.handleLogin}>
                    <Text style={styles.inputTitle}>Zaloguj się</Text>
                    </TouchableOpacity>

                    <View style={styles.register}>
                        <Text style={{color: "grey"}}>Nie posiadam konta</Text>
                        <TouchableOpacity style={styles.secondButton}
                                          onPress={() => this.props.navigation.navigate("Register")}>
                            <Text style={styles.inputTitle}>Rejestracja</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E2DEE5",
        marginLeft: 5,
    },
    greeting: {
        marginTop: 30,
        marginBottom: 20,
        fontSize: 20,
        textAlign: "center"
    },
    error: {
        color: "red",
        marginTop: 20,
    },
    form: {
        marginBottom: 50,
    },
    inputTitle: {
        marginTop: 10,
        color: "grey",
        fontSize: 10,
        fontWeight: "600",
        textTransform: "uppercase",
    },
    input: {
        borderBottomColor: "#E8AEBE",
        borderBottomWidth: 5,
        height: 40,
        fontSize: 15,
    },
    button: {
        marginTop: 50,
        marginHorizontal: 40,
        backgroundColor: "#E8AEBE",
        borderRadius: 5,
        height: 40,
        alignItems: "center",
        textAlign: "center"
    },
    secondButton: {
        backgroundColor: "#E8AEBE",
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 15,
        height: 40,
        width: 120,
        alignItems: "center",
        textAlign: "center"
    },
    register: {
        marginLeft: 170,
        marginTop: 80,
    },
});
