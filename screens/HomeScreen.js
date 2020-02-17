import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Picker} from 'react-native';
import * as firebase from "firebase";

export default class HomeScreen extends React.Component {
    state = {
        email: "",
        role: "",
        displayName: "",
        surname: "",
        errorMessage: "",
        uid: 0,
        location: {},
        latitude: 0,
        longitude: 0,
        showMap: false,
    };

    componentDidMount() {
        const { email, displayName, surname, uid } = firebase.auth().currentUser;
        this.setState({ email, displayName, surname, uid });
    };

    handleRole = () => {
        if (this.state.role) {
            const fc = firebase.functions();

            if (this.state.role === 'parent') {
                const addParentRole = fc.httpsCallable(('addParentRole'));
                addParentRole({email: this.state.email}).then((result) =>
                    console.log(result))
            }
            if (this.state.role === 'child') {
                const addChildRole = fc.httpsCallable(('addChildRole'));
                addChildRole({email: this.state.email}).then((result) =>
                    console.log(result))
            }
            else {
                console.log("Błąd, nie przyznano żadnej roli")
            }
        }
    }

    signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log("Signed out")
            });
    };

    showMap = () => {
        this.state.showMap = true;
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Witaj, {this.state.displayName} </Text>

                <Text style={styles.inputTitle}>
                    Wybierz rolę
                </Text>
                <Picker style={styles.picker}
                        selectedValue={this.state.role}
                        itemStyle={{height: 55}}
                        onValueChange={(itemValue) =>
                            this.setState({role: itemValue})}>
                    <Picker.Item label="rodzic" value="parent" />
                    <Picker.Item label="dziecko" value="child" />
                </Picker>
                <TouchableOpacity style={styles.button}
                                  onPress={this.handleRole}>
                    <Text style={styles.inputTitle}>Zatwierdz</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                                  onPress={() => this.props.navigation.navigate("Map")}>
                    <Text style={styles.inputTitle}>Mapka</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondButton}
                                  onPress={this.signOut}>
                    <Text>Wyloguj</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        marginTop: 40,
        marginBottom: 30,
        marginLeft: 80,
        color: "grey",
        fontSize: 15,
        fontWeight: "600",
        textTransform: "uppercase",
    },
    picker: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "black",
        flexDirection: "column",
        justifyContent: "center"
    },
    button: {
        marginTop: 50,
        marginLeft: 200,
        backgroundColor: "#E8AEBE",
        borderRadius: 5,
        height: 40,
        width: 90,
        alignItems: "center",
        textAlign: "center"
    },
    secondButton: {
        marginTop: 50,
        marginLeft: 20,
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