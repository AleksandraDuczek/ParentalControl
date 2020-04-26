import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Picker} from 'react-native';
import * as firebase from "firebase";

class ChooseRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            uid: "",
            name: "",
            surname: "",
            role: "parent",
            errorMessage: null,
        };
        this.handleRole = this.handleRole.bind(this);
    }

    componentDidMount() {
        let params;
       this.props.navigation.state.params
           ? params = this.props.navigation.state.params
           : params = {
           email: 'dupa@gmail.com',
           password: 'dupa',
           uid: '123',
           name: 'Czy',
           surname: 'Coś',
           errorMessage: null,
           };

        this.setState({
            email: params.email,
            password: params.password,
            uid: params.uid,
            name: params.name,
            surname: params.surname,
            errorMessage: null,
        });
    };

    handleRole() {
        if (this.state.role) {
            const email = this.state.email;
            const password = this.state.password;

            if (this.state.role === 'parent') {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        this.handleRegistration();
                    })
                    .catch(errorMessage => {
                        console.log(errorMessage)
                    });
                return;
            }
            if (this.state.role === 'child') {
                const addChildRole = fc.httpsCallable('addChildRole');

                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        addChildRole({email: this.state.email})
                            .then((result) => {
                                this.setState({role: result});
                            }
                    );
                    })
                    .catch(errorMessage => {
                        console.log(errorMessage)
                    });
                return;
            }
        }
    };

    handleRegistration() {
        const fc = firebase.functions();

        if (this.state.role === 'parent') {
            const addParentRole = fc.httpsCallable('addParentRole');
            addParentRole({email: this.state.email})
              .then((result) => {
                  debugger;
                  const { email, password, name, surname, errorMessage, role } = this.state;
                  this.setState({role: result});
                  this.props.navigation
                    .navigate("Direction", {email, password, name, surname, errorMessage, role });
              })
              .catch(errorMessage => {
                  console.log(errorMessage)
              });
        }
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

            </View>
        );
    }
}

export default ChooseRole;

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