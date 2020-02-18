import React, { useState, Component } from 'react';
/* Importación de componentes visuales necesarios para la app */
import { StyleSheet, Text, View, Image , TextInput, TouchableOpacity, Alert } from 'react-native';
/* Esta librería se agregó al proyecto debido a que con ella se puede manejar el auto-scrolling del teclado cuando se debe llenar 
un campo de texto de un formulario */
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
/* Librerias para la navegación entre pantallas */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/* Importación de libreria de Firebase */
import firebase from './firebase';
/* Libreria para validación de direcciones de correo electrónico */
import * as EmailValidator from 'email-validator';
import { HitTestResultTypes } from 'expo/build/AR';
/* Importacion de recursos */
import logo from './assets/Circulo.png';
import AgeInput from './AgeInput';

// Clase que representa el diseño de la pantalla inicial de la app
class HomeScreen extends Component {
  state = { username: null, password: null, nonValidInput: null }

  /* Funcion con la que se valida el correo electronico del usuario. Si la validación se hizo de forma correcta, se conecta a la base de
  datos en Firebase para revisar que el usuario existe. Si el usuario existe, se le redirige a la otra pantalla de la app. */
  _onSubmit = ({ navigation }) =>{
    if(EmailValidator.validate(this.state.username) == true) {
      this.setState({ nonValidInput: false });
      const { username, password } = this.state;

      firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then(() => this.props.navigation.navigate('Age')).catch(
        Alert.alert(
          'Error',
          'Los datos no son correctos',
          [
            { text: 'Ok' }
          ],
          { cancelable: false }
        )
      );
    } else { 
      this.setState({ nonValidInput: true });
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled 
      enableOnAndroid={true} resetScrollToCoords={{x:0, y:0}}> 
        <View style={styles.logo}>
          <Image source = {logo} style={styles.img}/>
          <Text style={styles.textLogoPrimary}>Neuron App</Text>
          <Text style={styles.textLogoSecondary}>Test</Text>
        </View>
    
        <View style={styles.formElement}>
          <Text style={styles.formText}>Correo Electrónico</Text>
          <TextInput keyboardType='email-address' placeholder='Email' onChangeText={value => this.setState({ username: value })} 
          style={styles.formInput} />
          {this.state.nonValidInput ? (
            <Text style={styles.textAlert}>Correo electrónico no valido.</Text> 
          ) : null}       
        </View>
    
        <View style={styles.formElement}>
          <Text style={styles.formText}>Contraseña</Text>
          <TextInput style={styles.formInput} placeholder='Contraseña' onChangeText={value => this.setState({ password: value })} 
          secureTextEntry={true}/>
        </View>
    
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={this._onSubmit}>
            <Text style={styles.buttonText}>Iniciar</Text>
          </TouchableOpacity>
        </View>     
      </KeyboardAwareScrollView>
    );
  }
}

const Stack = createStackNavigator();

// Clase que representa la pila de navegacion de la app
class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Age' component={AgeInput} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

/* ESTILOS DE LOS COMPONENTES DE LA PAGINA */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },

  logo: {
    alignItems: 'center',
    marginBottom: 40,
  },

  img: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },

  textLogoPrimary: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  textLogoSecondary: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dcdcdc',
  },

  formInput: {
    paddingHorizontal: 5,
    paddingVertical: 0,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#fff',
  },

  textAlert: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
    marginTop: 1,
    marginBottom: -5,
  },

  formText: {
    textAlign: 'left',
    color: '#a9a9a9',
    marginBottom: 4,
  },

  formElement: {
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 25,
  },
  
  buttonView: {
    alignItems: 'center',
  },

  button: {
    height: 60,
    width: 300,
    backgroundColor: '#20dd99',
    borderRadius: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 15,
  }
});