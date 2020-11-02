import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView from "react-native-maps";

export default class Parent extends React.Component {
	state = {
		location: {},
		latitude: 0,
		longitude: 0,
	};

	componentWillMount() {
		this._getLocation();
		this.getInitialRegions();
	}

	_getLocation = async () => {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);

		if (status !== 'granted') {
			this.setState({
				errorMessage: "Permission not granted"
			})
		}

		const userLocation = await Location.getCurrentPositionAsync()
			.then((response) =>
				this.setState({ latitude: response.coords.latitude,
					longitude: response.coords.longitude}));
	};

	getInitialRegions() {
		if (this.state.latitude && this.state.longitude) {
			return {
				latitude: this.state.latitude,
				longitude: this.state.longitude,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005
			}
		}
	}

	getMarkers() {
		if (this.state.latitude && this.state.longitude) {
			return {
				latitude: this.state.latitude,
				longitude: this.state.longitude,
			}
		} return {latitude: 0, longitude: 0}
	}

	signOut = () => {
		firebase.auth().signOut()
			.then(() => {
				console.log("Signed out")
			});
	};

	render() {
		return (
			<View style={styles.container}>
				<MapView style={styles.map}
				         initialRegion={this.getInitialRegions()}>
					<MapView.Marker coordinate={this.getMarkers()}>
					</MapView.Marker>
				</MapView>

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
	map: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});