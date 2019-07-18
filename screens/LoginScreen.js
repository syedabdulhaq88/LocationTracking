import React from "react"
import {ActivityIndicator,AsyncStorage, StyleSheet, Text, View, Image, Button } from "react-native"
import { androidClientId } from "../assets/client_secret"

import { Google } from "expo";
 import * as GoogleSignIn from 'expo-google-sign-in'
 import { AppAuth } from 'expo-app-auth';



export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { signedIn: false, name: "", photoUrl: "" ,loader:false }
  }

  async componentDidMount() {
    try {

    //  await GoogleSignIn.initAsync({ clientId: '289902907020-f6gtggqcsfmumnnldsf1s6qu54l3lanu.apps.googleusercontent.com' });
      // await Google.initAsync({ 
      //   clientId:'289902907020-f6gtggqcsfmumnnldsf1s6qu54l3lanu.apps.googleusercontent.com',
      //  });

      let account= await  AsyncStorage.getItem("Account");
      if(account != null){
        this.props.navigation.navigate('Main');
      
      }

    } catch ({ message }) {
      alert( message);
    }

  }

  signIn = async () => {
    try {
   //    await GoogleSignIn.askForPlayServicesAsync();


   console.log(androidClientId);
      this.setState({loader:true});
      const result = await Google.logInAsync({
        clientId:'289902907020-f6gtggqcsfmumnnldsf1s6qu54l3lanu.apps.googleusercontent.com',
        scopes: ["profile", "email"]
      })
      this.setState({loader:false});
      if (result.type === "success") {

        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
  
        await AsyncStorage.setItem("Account",JSON.stringify(result));
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  mainScreen = async () => {
    try {
     
      this.props.navigation.navigate('Main');
    } catch (e) {
      console.log("error", e)
    }
  }


  signOutAsync = async () => {
    try {
      await Google.logOutAsync();
      await AsyncStorage.setItem("Account",null);
    } catch ({ message }) {
      alert('signOutAsync: ' + message);
    }
  };
  _storeData = async (responseJson) => {
  //  await AsyncStorage.setItem("User_ID", responseJson.User_ID.toString());
  
    
    if (responseJson.Zones.length > 0) {
        let Zones=responseJson.Zones;
        await AsyncStorage.setItem("Zones",JSON.stringify(Zones));
    }
    if (responseJson.Cities.length > 0) {
        let Cities=responseJson.Cities;
        await AsyncStorage.setItem("Cities",JSON.stringify(Cities));
    }
    if (responseJson.LocationTypes.length > 0) {
        let LocationTypes=responseJson.LocationTypes;
        await AsyncStorage.setItem("LocationTypes",JSON.stringify(LocationTypes));
    }
      if (responseJson.Locations.length > 0) {
        let Locations=responseJson.Locations;
        await AsyncStorage.setItem("Locations",JSON.stringify(Locations));
      }
      if (responseJson.Areas.length > 0) {
        let Areas=responseJson.Areas;
        await AsyncStorage.setItem("Areas",JSON.stringify(Areas));
      }
}


  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} mainScreen={this.mainScreen} />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    )
  }
}

const LoginPage = props => {
  return (
    <View>
      <ActivityIndicator
                animating={false}
                color="black"
                size="large"
               // style={styles.activityIndicator}
              />
      <Text style={styles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" disabled={props.loader}  onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome</Text>
      <Text style={styles.header}>{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
      <Button title="Lets Do ti" onPress={() => props.mainScreen()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 20
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  //  height: 80
},
  image: {
    marginTop: 15,
    width: 100,
    height: 100,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})