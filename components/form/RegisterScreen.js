import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import 'firebase/functions';

export default class RegisterScreen extends React.Component {
    state = {
        email: "",
        password: "",
        uid: "",
        name: "",
        surname: "",
        errorMessage: null,
    };

    handleRegistration = () => {
        const { email, password, name, surname, errorMessage, uid } = this.state;

        this.props.navigation
            .navigate("ChooseRole", { email, password, name, surname, errorMessage, uid });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greeting}> Zarejestruj się </Text>
                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>
	                        Imię
                        </Text>
                        <TextInput style={styles.input}
                                   autoCapitalize="words"
                                   onChangeText={name => this.setState({name})}
                                   value={this.state.name}>
                        </TextInput>
                    </View>

                    <View>
                        <Text style={styles.inputTitle}>
	                        Nazwisko
                        </Text>
                        <TextInput style={styles.input}
                                   autoCapitalize="words"
                                   onChangeText={surname => this.setState({surname})}
                                   value={this.state.surname}>
                        </TextInput>
                    </View>

                    <View>
                        <Text style={styles.inputTitle}>
                            Adres email
                        </Text>
                        <TextInput style={styles.input}
                                   autoCapitalize="words"
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
                                   autoCapitalize="words"
                                   onChangeText={password => this.setState({password})}
                                   value={this.state.password}>
                        </TextInput>
                    </View>

                    <Text style={styles.error}>
                        { this.state.errorMessage &&
                        <Text style={styles.error}>
	                        Wystąpił błąd, przepraszamy
                        </Text>
                        }
                    </Text>

                    <TouchableOpacity style={styles.button}
                                      onPress={this.handleRegistration}>
                        <Text style={styles.inputTitle}>
	                        Dalej
                        </Text>
                    </TouchableOpacity>
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
});
