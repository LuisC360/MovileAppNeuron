import React, { useState, Component } from 'react';
import { StyleSheet, View, Text, Button, TextInput , Image, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import flecha from './assets/FlechaAtras.png';
import { setLightEstimationEnabled } from 'expo/build/AR';
import { TouchableOpacity } from 'react-native-gesture-handler';

/* CLASE QUE REPRESENTA LA PANTALLA DE REVISIÓN DE EDAD */
class App extends Component { 
  state = { date: null, edad: null, day: null, month: null, year: null }

  /* Función que calcula la edad del usuario basandose en lo que este escribió en los tres TextInputs. Si la fecha introducida por
  el usuario es correcta, la edad se mostrará en un componente Text. De lo contrario, se le avisará al usuario que la fecha que 
  introdujo no es correcta. */
  _ageCalc = () => {
    if(this.state.day < 32 && this.state.day > 0 && this.state.month < 13 && this.state.month > 0 && this.state.year != 0) {
      var fecha = Date.parse(this.state.year + '-' + this.state.month + '-' + this.state.day);

      var hoy = new Date();
      var fechaNacimiento = new Date(fecha);
      var edad_ahora = hoy.getFullYear() - fechaNacimiento.getFullYear();
      var mes = hoy.getMonth() - fechaNacimiento.getMonth();

      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad_ahora--;
      }

      this.setState({ edad: edad_ahora });
    } else {
      Alert.alert(
        'Error',
        'Por favor introduce una fecha valida',
        [
          { text: 'Ok' }
        ],
        { cancelable: false },
      );
    }
  }

  // Diseño de la pantalla de chequeo de edad
  render () {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container} scrollEnabled enableOnAndroid={true} 
      resetScrollToCoords={{x:0, y:0}}>
        <View style={styles.topView}>
          <TouchableOpacity style={styles.img} onPress={() => this.props.navigation.navigate('Home')}>
            <Image source={flecha} />
          </TouchableOpacity>
          <View style={styles.topTextWrapper}>
            <Text style={styles.topTextPrimary}>Bienvenido a Neuron</Text>
              <Text style={styles.topTextSecondary}>¿O no?</Text>
            </View>
        </View>

        <View style={styles.middleView}>
          <Text style={styles.formText}>Fecha de nacimiento</Text>
          <View style={styles.formRow}>
            <View style={styles.textInputWrapper}>
              <TextInput style={styles.formInput} placeholder='DD' keyboardType='number-pad' 
              onChangeText={ value => this.setState({ day: value }) }/>
            </View>
            <View style={styles.textInputWrapper}>
              <TextInput style={styles.formInput} placeholder='MM' keyboardType='number-pad' 
              onChangeText={ value => this.setState({ month: value }) }/>
            </View>
            <View style={styles.textInputWrapper}>
              <TextInput style={styles.formInput} placeholder='AA' keyboardType='number-pad' 
              onChangeText={ value => this.setState({ year: value }) }/>
            </View>
          </View>                
        </View>

        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={this._ageCalc}>
            <Text style={styles.buttonText}>CALCULAR EDAD</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ageView}>
          <Text style={styles.ageTextPrimary}>Tu edad es:</Text>
          <Text style={styles.ageNumber}>{this.state.edad}</Text>
          <Text style={styles.ageTextSecondary}>Años</Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default App;

/* ESTILOS DE LOS COMPONENTES DE LA PÁGINA */
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexDirection: 'column',
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
    },

    img: {
      marginRight: 10,
    },

    topTextPrimary: {
      fontWeight: 'bold',
      fontSize: 20,
    },

    topTextSecondary: {
      fontWeight: 'bold',
      color: '#bbbec5',
      fontSize: 20,
    },

    topView: {
      marginBottom: 120,
      flexDirection: 'row',
      marginRight: 80,
    },

    topTextWrapper: {

    },

    formText: {
      color: '#9ca0a3',
      fontWeight: 'bold',
      marginBottom: 20,
    },

    formInput: {
      borderRadius: 5,
      paddingHorizontal: 5,
      height: 50,
      fontSize: 25,
      textAlign: 'center',
      width: 90,
      marginRight: 10,
      backgroundColor: '#fff',
    },

    middleView: {
      paddingBottom: 40,
    },

    formRow: {
      flexDirection: 'row',
    },

    textInputWrapper: {

    },

    buttonView: {
      marginBottom: 60,
      alignItems: 'center'
    },

    button: {
      alignItems: 'center',
      backgroundColor: '#20dd99',
      height: 60,
      width: 300,
      borderRadius: 10,
    },

    buttonText: {
      fontWeight: 'bold',
      color: '#fff',
      fontSize: 15,
      textAlign: 'center',
      padding: 17,
    },

    ageView: {
      alignItems: 'center',
    },

    ageTextPrimary: {
      fontWeight: 'bold',
      color: '#b6b5b9',
      fontSize: 15,
    },

    ageNumber: {
      color: '#20dd99',
      fontWeight: 'bold',
      fontSize: 80,
    },

    ageTextSecondary: {
      fontWeight: 'bold',
      color: '#666b77',
      fontSize: 20,
      marginTop: -15,
    }
});