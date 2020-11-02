import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as firebase from 'firebase';

export default class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = 	{
            email: "",
            role: "",
            familyId: 0,
        };
        this.signOut = this.signOut.bind(this);
        this.signId = this.signId.bind(this)
    }

    componentDidMount() {
        const params = this.props.navigation.state.params;
        if (params) {
            this.setState({
                email: params.email,
                role: params.role,
                familyId: params.familyId,
            });
        }
        const { email } = firebase.auth().currentUser;
        this.setState({ email });
    };

    signOut() {
        this.props.navigation.navigate("Auth", { logOut: true });
    };

    signId() {
        const fc = firebase.functions();
        const addParentRole = fc.httpsCallable('addFamilyIdToParent');
        addParentRole({email: this.state.email, familyId: this.state.familyId}).then(() => {
        })
        .catch(err => console.log(err))
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Rola: {this.state.role}</Text>
                <Text>Email: {this.state.email}</Text>
                <Text>
                    Aby móc korzystać z pełni funkcjonalności powiąż konto dziecka z id: {this.state.familyId}
                </Text>
                <TouchableOpacity style={styles.button}
                                  onPress={this.signId}>
                    <Text style={styles.inputTitle}>
                        Powiąż
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
        marginTop: 300,
        marginLeft: 100,
        backgroundColor: "#E8AEBE",
        borderRadius: 5,
        height: 80,
        width: 120,
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