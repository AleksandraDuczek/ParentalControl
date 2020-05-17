import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';

export default class Direction extends React.Component {
    constructor(props) {
        super(props);
        this.state = 	{
            name: "",
            email: "",
            role: "",
            displayName: "",
            surname: "",
            errorMessage: "",
            uid: 0,
            familyId: 0,
        };
        this.signOut = this.signOut.bind(this);
    }

    goToParentComponent(email, role, familyId) {
        this.props.navigation.navigate("Parent", { email, role, familyId });
    }

    goToChildComponent() {
        const { email,  role } = this.state;
        this.props.navigation.navigate("Child", { email, role });
    }

    componentDidMount() {
        const { email } = firebase.auth().currentUser;
        this.setState({ email });

        let params;
        this.props.navigation.state.params
          ? params = this.props.navigation.state.params
          : params = null;

        this.setState({
            email: params.email,
            password: params.password,
            name: params.name,
            surname: params.surname,
            role: params.role,
            familyId: params.familyId,
        });

        if (!params.role) {
            firebase.auth().currentUser.getIdTokenResult()
              .then((idTokenResult) => {
                  if (idTokenResult.claims.parent || idTokenResult.claims.child) {
                      idTokenResult.claims.parent
                        ? this.goToParentComponent()
                        : this.goToChildComponent();
                  }
                  else {
                      this.signOut();
                  }
              })
              .catch(err => {
                  console.log(err);
              })
        }
        else {
            if (params.role === 'parent') {
                this.goToParentComponent(params.email, params.role, params.familyId);
            }
            if (params.role === 'child') {
                this.goToChildComponent(params.email, params.role);
            }
        }
    }

    signOut() {
        this.props.navigation.navigate("Auth", { logOut: true });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Komponent na chwile, do usuniecia</Text>
                <TouchableOpacity style={styles.button}
                                  onPress={this.signOut}>
                    <Text style={styles.inputTitle}>
                        Wyloguj
                    </Text>
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