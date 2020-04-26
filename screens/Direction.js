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
        };
        this.signOut = this.signOut.bind(this);
    }

    goToParentComponent() {
        if (!this.state.role) this.state.role = 'parent';
        const { email, role } = this.state;
        this.props.navigation.navigate("Parent", { email, role });
    }

    goToChildComponent() {
        if (!this.state.role) this.state.role = 'child';
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
        });

        if (!params.role) {
            firebase.auth().currentUser.getIdTokenResult()
              .then((idTokenResult) => {
                  debugger;
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
                this.goToParentComponent()
            }
            if (params.role === 'parent') {
                this.goToChildComponent();
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