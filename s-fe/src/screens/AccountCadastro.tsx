import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useState } from 'react';

export default function Perfil() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  const sendNewUser = async () => {
    try {
      const res = await fetch('http://10.0.2.2:3000/api/users/neue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        })
      })

      if (res.ok) {
        console.log('Usuário cadastrado com sucesso')
      }

    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
  }


  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../assets/img/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Título */}
      <Image
        source={require("../../assets/img/user.png")}
        style={{ width: 200, height: 200, marginBottom: 50 }}
        resizeMode="contain"
      />

      <View style={styles.inputContainer}>
        <Feather name="user" size={20} color="#7fabc6" style={styles.icon} />
        <TextInput placeholder="Nome:" placeholderTextColor="#7fabc6" style={styles.input} onChangeText={(text) => handleChange('name', text)} />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="mail" size={20} color="#7fabc6" style={styles.icon} />
        <TextInput placeholder="Email:" placeholderTextColor="#7fabc6" style={styles.input} onChangeText={(text) => handleChange('email', text)} />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="document" size={24} color="#7fabc6" />
        <TextInput placeholder="Senha:" placeholderTextColor="#7fabc6" secureTextEntry style={styles.input} onChangeText={(text) => handleChange('password', text)}

        />
      </View>

      {/* Botão salvar */}
      <TouchableOpacity style={styles.button} onPress={sendNewUser}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>

      {/* Barra inferior */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.buttonNav}>
          <Feather name="clock" size={24} color="#7fabc6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNav}>
          <FontAwesome name="check" size={24} color="#7fabc6" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonNav}>
          <Ionicons name="document" size={24} color="#7fabc6" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deecf5",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  logo: {
    width: 380,
    height: 55,
    resizeMode: "contain",
    position: "absolute",
    top: -58,
    left: 130,
    alignSelf: "center",
    zIndex: 999,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4A7CA5",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7fabc6",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: "#deecf5",
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#7fabc6",
  },
  button: {
    backgroundColor: "#7fabc6",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    position: "absolute",
    bottom: 40,
    width: "80%",
    backgroundColor: "#deecf5",
  },
  buttons: {
    width: "80%",
    marginTop: 10,
  },
  buttonNav: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#deecf5',
    borderWidth: 2,
    borderColor: '#8bb6cf',
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
  },
  buttonNavText: {
    fontSize: 18,
    color: '#7fabc6',
    marginLeft: 10,
  }
});
