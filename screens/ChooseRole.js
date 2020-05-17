import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Picker} from 'react-native';
import * as firebase from "firebase";

export default class ChooseRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            uid: "",
            name: "",
            surname: "",
            role: "parent",
            familyId: 0,
            errorMessage: null,
            waitingFlag: false,
        };
        this.handleRole = this.handleRole.bind(this);
    }

    componentDidMount() {
       let params;
       this.props.navigation.state.params
           ? params = this.props.navigation.state.params
           : params = null;

       if (params === null) return;

       this.setState({
           email: params.email,
           password: params.password,
           uid: params.uid,
           name: params.name,
           surname: params.surname,
           familyId: 0,
           errorMessage: null,
           waitingFlag: false,
       });
    };

    handleRole() {
        if (this.state.role) {
            const email = this.state.email;
            const password = this.state.password;
            let hasCanceled = false;

            this.state.familyId = this.createId(email, this.state.name, this.state.surname);

            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    if (!hasCanceled) {
                        this.handleRegistration = this.handleRegistration.bind(this);
                    }
                })
                .catch(errorMessage => {
                    hasCanceled = true;
                    console.log(errorMessage);
                });

            if (firebase.auth().currentUser) {
                this.handleRegistration();
            }
        }
    };

    createId(email, name, surname) {
        const a = email.charCodeAt(0);
        const b = name.charCodeAt(1);
        const c = surname.charCodeAt(2);
        return Number(a+b+c);
    }

    handleRegistration() {
        const fc = firebase.functions();
        const { email, password, name, surname, errorMessage, role, familyId } = this.state;

        if (this.state.role === 'parent') {
            const addParentRole = fc.httpsCallable('addParentRole');
            addParentRole({email: this.state.email})
              .then((result) => {
                  console.log(result);
                  this.props.navigation
                    .navigate("Direction", {email, password, name, surname, errorMessage, role, familyId });
              });
        }

        if (this.state.role === 'child') {
            const addChildRole = fc.httpsCallable('addChildRole');
              addChildRole({email: this.state.email})
                .then((result) => {
                    console.log(result);
                    this.props.navigation
                      .navigate("Direction", {email, password, name, surname, errorMessage, role });
                  });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Witaj, {this.state.displayName}
                </Text>

                <Text style={styles.inputTitle}>
                    Wybierz rolę
                </Text>

                <Picker style={styles.picker}
                        selectedValue={this.state.role}
                        itemStyle={{height: 55}}
                        onValueChange={(itemValue) => this.setState({role: itemValue})}>
                    <Picker.Item label="rodzic" value="parent" />
                    <Picker.Item label="dziecko" value="child" />
                </Picker>

                <TouchableOpacity style={styles.button}
                                  onPress={this.handleRole}>
                    <Text style={styles.inputTitle}>
                        Zatwierdz
                    </Text>
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